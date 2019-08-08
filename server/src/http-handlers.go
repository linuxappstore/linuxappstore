package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func apps(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case http.MethodGet:
		getApps(w, r)

	case http.MethodPost:
		saveApps(w, r)

	}

}

func saveApps(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	type Message struct {
		ApiKey string
		Apps   []LinuxApp
	}

	decoder := json.NewDecoder(r.Body)

	var t Message

	err := decoder.Decode(&t)

	if err != nil {
		panic(err)
	}

	if t.ApiKey != apiKey {
		fmt.Println("Invalid key")
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	for _, app := range t.Apps {
		if app.Id == 0 {
			insertApp(app)
		} else {
			updateApp(app)
		}
	}
}

func insertApp(app LinuxApp) {
	currentTime := time.Now()
	var appID int
	err := db.QueryRow(`INSERT INTO linux_app(name, type, last_updated, src, icon, current_version, identifier) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
		app.Name, app.Type, currentTime, app.Src, app.Icon, app.CurrentVersion, app.Identifier).Scan(&appID)

	if err != nil {
		panic(err)
	}
}

func updateApp(app LinuxApp) {
	currentTime := time.Now()

	res, err := db.Exec(`UPDATE linux_app set name=$1, type=$2, last_updated=$3, src=$4, icon=$5, current_version=$6, identifier=$7 where id=$8 RETURNING id`,
		app.Name, app.Type, currentTime, app.Src, app.Icon, app.CurrentVersion, app.Identifier, app.Id)

	if err != nil {
		panic(err)
	}

	rowsUpdated, err := res.RowsAffected()

	if err != nil {
		panic(err)
	}

	_ = rowsUpdated
}

func getApps(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	params := r.URL.Query()
	typeStr := params.Get("type")

	var b bytes.Buffer

	b.WriteString(`SELECT * FROM linux_app`)

	if len(typeStr) > 0 {

		typeValue, err := strconv.Atoi(typeStr)

		if err != nil {
			panic(err)
		}

		b.WriteString(fmt.Sprintf(` where type = %d`, typeValue))
	}

	rows, err := db.Query(b.String())

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	apps := make([]LinuxApp, 0)

	for rows.Next() {
		app := LinuxApp{}
		err := rows.Scan(&app.Id, &app.Name, &app.Type, &app.DateAdded, &app.LastUpdated,
			&app.Src, &app.Icon, &app.CurrentVersion, &app.Identifier, &app.Summary)

		if err != nil {
			panic(err)
		}

		apps = append(apps, app)
	}

	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apps)
}

func getRecentlyAdded(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	params := r.URL.Query()
	limitStr := params.Get("limit")
	typeStr := params.Get("type")

	var b bytes.Buffer

	b.WriteString(`SELECT * FROM vw_recently_added`)

	if len(typeStr) > 0 {

		typeValue, err := strconv.Atoi(typeStr)

		if err != nil {
			panic(err)
		}

		b.WriteString(fmt.Sprintf(` where type = %d`, typeValue))

	}

	if len(limitStr) > 0 {

		limit, err := strconv.Atoi(limitStr)

		if err != nil {
			panic(err)
		}

		b.WriteString(fmt.Sprintf(` limit %d`, limit))
	}

	query := b.String()

	rows, err := db.Query(query)

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	apps := make([]LinuxApp, 0)

	for rows.Next() {
		app := LinuxApp{}

		err := rows.Scan(&app.Id, &app.Name, &app.Type, &app.DateAdded, &app.LastUpdated,
			&app.Src, &app.Icon, &app.CurrentVersion)

		if err != nil {
			panic(err)
		}

		apps = append(apps, app)
	}

	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apps)
}

func getRecentlyUpdated(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	params := r.URL.Query()
	limitStr := params.Get("limit")
	typeStr := params.Get("type")

	var b bytes.Buffer

	b.WriteString(`SELECT * FROM vw_recently_updated`)

	if len(typeStr) > 0 {

		typeValue, err := strconv.Atoi(typeStr)

		if err != nil {
			panic(err)
		}

		b.WriteString(fmt.Sprintf(` where type = %d`, typeValue))

	}

	if len(limitStr) > 0 {

		limit, err := strconv.Atoi(limitStr)

		if err != nil {
			panic(err)
		}

		b.WriteString(fmt.Sprintf(` limit %d`, limit))
	}

	query := b.String()

	rows, err := db.Query(query)

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	apps := make([]LinuxApp, 0)

	for rows.Next() {
		app := LinuxApp{}

		err := rows.Scan(&app.Id, &app.Name, &app.Type, &app.DateAdded, &app.LastUpdated,
			&app.Src, &app.Icon, &app.CurrentVersion)

		if err != nil {
			panic(err)
		}

		apps = append(apps, app)
	}

	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apps)
}
