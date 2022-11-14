const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://seent.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

export default corsConfig;
