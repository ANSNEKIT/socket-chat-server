import express from 'express'
import { Router } from 'express'

const router = Router()

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  
    res.send("response ok");
  });

export default router