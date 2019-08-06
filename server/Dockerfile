FROM golang:1.12.7

RUN mkdir /app
ADD src/ /app/

WORKDIR /app

RUN go get -d ./...
RUN go build

EXPOSE 8080
CMD ["./app"]