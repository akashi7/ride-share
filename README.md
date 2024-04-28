# Installation

1. clone this repository
2. Install dependencies by running: `yarn`
3. Create a .env file in the root of your application directory that then copy the environment variable in the .env.example file into then .env file you create
4. add your google api key to the environment variable you just created
5. Start the development server with the command: `yarn dev`
6. Once the server is running, open your web browser and go to: `http://localhost:5173/`

## Approach

The approach used in the project calculates the estimated time of arrival (ETA) and remaining distance to the next stop based on the average speed of 30 km/h. It continuously updates the ETA and distance remaining as the tracker moves towards the next stop, with a threshold distance of 0.05 km used for stop detection.
