# CSIT6000P Spatial and Multimedia Databases 2023 Spring

## Implementation Group Project

This project is to:

- Store spatial data with PostGIS
- Visualize the spatial data with QGIS
- Further extend the usage of them to frontend area (QGIS server, React.JS).
- Make it deployable on Docker environment

## Teammates

[@hoyinpeter](https://github.com/hoyinpeter)
[@wcrabiot](https://github.com/wcrabiot)
[@Zhiyuan](https://github.com/ziyuen)

## Project PPT and Report

[Report](https://drive.google.com/file/d/12-wrkHL0yQqZHn0onnVNWXMvDQKjOsLW/view?usp=sharing)<br/>
[PPT](https://drive.google.com/file/d/1MCtsYHixG_640-zJ5aUQ6cL_Hb_yDABn/view?usp=share_link)

## Server URLs

| Service     | URL                               | Remarks                               |
| ----------- | --------------------------------- | ------------------------------------- |
| Frontend    | https://spatial.johnnyip.com      | The frontend UI of our application    |
| QGIS Server | https://qgis.johnnyip.com         | Can view the QGIS project file online |
| Backend     | https://spatial-back.johnnyip.com | Backend API server                    |

## Backend API Specification

[https://swagger.johnnyip.com/](https://swagger.johnnyip.com/)

## Result Replicate in Docker

### What's included

The complete stack of application, including:

- **Frontend UI** (React.js)
- **Backend API Server** (Node.js)
- **PostGIS Database** (With complete table loaded during startup)
- **QGIS server:** View QGIS project file or layer query (WMS) in frontend

### Prerequisites

- Before you begin, make sure you have Docker client installed

- Download Docker-compose file [here](https://drive.johnnyip.com/d/s/tOZIC17QasynG6aEwjexArn340hRdtdk/IYvz32RmDWHu-PGpgJ9nRNlkS3DjSlsL-o7gg1wcyaAo)

### Steps

- Open Terminal (Mac/Linux), or cmd in Windows, and enter the following commands

```
cd <path_to_your_folder>
docker compose up -d
```

- After those necessary docker images are downloaded, it will be up and running.

| Service | Frontend         | QGIS Server           |
| ------- | ---------------- | --------------------- |
| URL     | http://localhost | http://localhost:8080 |
