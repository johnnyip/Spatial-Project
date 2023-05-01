# CSIT6000P Spatial and Multimedia Databases 2023 Spring

## Implementation Group Project

## Teammates

[@hoyinpeter](https://github.com/hoyinpeter)
[@wcrabiot](https://github.com/wcrabiot)
[@Zhiyuan](https://github.com/ziyuen)

## Server URLs

| Service | Frontend                           | QGIS Server                           | Backend                           |
| ------- | ---------------------------------- | ------------------------------------- | --------------------------------- |
| URL     | https://spatial.johnnyip.com       | https://qgis.johnnyip.com             | https://spatial-back.johnnyip.com |
| Remarks | The frontend UI of our application | Can view the QGIS project file online | Backend API server                |

## Dataset used:

[香港政府資料一線通 (data.gov.hk)](https://data.gov.hk)

- [FEHD facility and service locations (食物環境衞生署的設施及服務位置)](https://data.gov.hk/tc-data/dataset/hk-fehd-fehdlocatn-fehd-facility-and-service-locations)
- [District boundary (地方行政區分界)](https://data.gov.hk/tc-data/dataset/hk-had-json1-hong-kong-administrative-boundaries)

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

