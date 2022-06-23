# PawsForUs

PawsForUs is a geosocial networking application that allows users to meet other pet owners. The application also enables users to sell, buy, or adopt a pet.

## Prerequisites

1. NodeJS
1. npm
1. MongoDB

## Setting up locally

1. Clone this repo. `git clone https://github.com/okaystephen/pawsforus.git`
1. Navigate to the root directory.
1. Install dependencies. `npm i`
1. Copy `.env.example` to `.env` and supply the required information.
1. Run the server. `npm run dev`

## Project structure

```
./
├─ asssets/
│  ├─ css/
│  ├─ icons/
│  ├─ img/
│  ├─ js/
├─ config/              // configuration variables
├─ controllers/
│  ├─ api/              // for REST API
│  ├─ web/              // for rendering views
├─ loaders/             // autoloading of route files
├─ helpers/
├─ middleware/
├─ models/
├─ routes/
│  ├─ api/              // for REST API
│  ├─ web/              // for rendering views
├─ services/            // business logic
├─ storage/
│  ├─ app/
│  │  ├─ public/        // file uploads during development
├─ validators/
├─ views/

```
