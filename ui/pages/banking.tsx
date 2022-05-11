import router from "next/router";
import * as Auth from "../services/auth";
import Layout from "../components/layout";
import { useEffect } from "react";

export default function Banking() {
  useEffect(() => {
    if (Auth.isAuthenticated() === false) {
      router.push({
        pathname: "/404",
      });
    }
  }, []);
  return <Layout>sorry we're WIP!</Layout>;
}
