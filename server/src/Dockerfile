FROM microsoft/dotnet:2.2-sdk AS build-env

WORKDIR /app

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy everything and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.2-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .

# Open ports
EXPOSE 5000

# Set environment variables
ENV ASPNETCORE_URLS http://*:5000

ENTRYPOINT ["dotnet", "server.dll"]
