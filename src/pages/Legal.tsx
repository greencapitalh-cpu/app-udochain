// [34] src/pages/Legal.tsx
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export default function Legal() {
  const { req } = useApi();
  const [tos, setTos] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>
