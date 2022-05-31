const corsConfig = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default corsConfig;
