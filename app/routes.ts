import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("army", "routes/army.tsx"),
    route("stripe", "routes/stripe.tsx"),
    route("unknown", "routes/unknown.tsx")] satisfies RouteConfig;
