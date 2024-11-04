import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GlobalApi from "../Services/GlobalApi";
import GamesDisplay from "../Componenets/GamesDisplay";

export default function GamePage() {
    