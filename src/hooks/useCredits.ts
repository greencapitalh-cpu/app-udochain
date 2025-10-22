// [37] src/hooks/useCredits.ts
import { useEffect, useState } from "react";
import useApi from "./useApi";

export default function useCredits() {
  const { req } = useApi();
 
