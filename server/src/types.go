package main

type LinuxApp struct {
	Id             int     `json:"id"`
	Name           string  `json:"name"`
	Type           int     `json:"type"`
	DateAdded      string  `json:"dateAdded"`
	LastUpdated    string  `json:"lastUpdated"`
	Src            string  `json:"src"`
	Icon           string  `json:"icon"`
	CurrentVersion *string `json:"currentVersion"`
	Identifier     *string `json:"identifier"`
	Summary        *string `json:"summary"`
}
