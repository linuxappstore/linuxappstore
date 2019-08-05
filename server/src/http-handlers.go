package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
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
