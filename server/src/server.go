package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	fmt.Printf("Connecting to database host=%s on port=%d\n", host, port)

	connString := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	tmpDB, err := sql.Open("postgres", connString)

	if err != nil {
		panic(err)
	}

	err = tmpDB.Ping()

	if err != nil {
		panic(err)
	}

	db = tmpDB

	fmt.Println("Successfully connected!")
}

func main() {
	http.HandleFunc("/api/apps", getApps)
	http.HandleFunc("/api/recentlyAdded", getRecentlyAdded)
	http.HandleFunc("/api/recentlyUpdated", getRecentlyUpdated)

	fmt.Println("Server running on port: 5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
