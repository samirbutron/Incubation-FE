## Front-End table for API consumption of "Personas" and "Vehiculos"

This project is a front-end table for API consumption of "Personas" and "Vehiculos". There is a relationship between Personas and Vehiculos in the database:

- One Person -> Many cars

### Getting Started

To get started with this project, you will need to have the following installed:

- Node.js
- NPM

Once you have those installed, you can clone the repository and install the dependencies by running the following commands:

```
git clone https://github.com/your-username/your-repository.git
cd your-repository
npm install
```

### Running the Project

To run the project, you can run the following command:

```
npm start
```

This will start the development server on port 3000. You can then open your browser and navigate to http://localhost:3000 to see the project.

### Code Explanation

The project is built using React and TypeScript. The main components are the `PersonasTable` and the `VehiculosTable`. The `PersonasTable` displays a list of all the personas in the database, and the `VehiculosTable` displays a list of all the vehicles for a given persona.

The data for the tables is fetched from the API using the `axios` library. The `PersonasTable` and the `VehiculosTable` are both components that are rendered by the `App` component.