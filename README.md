# pawsforus

## Prerequisites

1. NodeJS
1. npm

## Setting up locally

1. Clone this repo. `git clone https://github.com/okaystephen/pawsforus.git`
1. Navigate to the root directory.
1. Install dependencies. `npm i`
1. Copy `.env.example` to `.env`.
1. Run the server. `npm run dev`

## Project structure

```
./
├─ config/              // configuration variables
├─ controllers/
│  ├─ api/              // for REST API
│  ├─ web/              // for rendering views
├─ helpers/
├─ middleware/
├─ models/
├─ public/
│  ├─ css/
│  ├─ icons/
│  ├─ img/
│  ├─ js/
├─ routes/
│  ├─ api/              // for REST API
│  ├─ web/              // for rendering views
├─ storage/
│  ├─ app/
│  │  ├─ public/        // file uploads during development
├─ views/

```