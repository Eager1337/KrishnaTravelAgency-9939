import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import Home from "./pages/home";
import { Layout } from "./components/layout";
import SEO from "./components/seo";
import { Provider } from "./components/provider";
import { AgentFeedback } from "@runablehq/website-runtime";

const About = lazy(() => import("./pages/explore").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("./pages/explore").then((m) => ({ default: m.Contact })));
const Destinations = lazy(() =>
  import("./pages/explore").then((m) => ({ default: m.Destinations })),
);
const DestinationDetail = lazy(() =>
  import("./pages/explore").then((m) => ({ default: m.DestinationDetail })),
);
const Services = lazy(() => import("./pages/explore").then((m) => ({ default: m.Services })));
const ServiceDetail = lazy(() =>
  import("./pages/explore").then((m) => ({ default: m.ServiceDetail })),
);
const NotFound = lazy(() => import("./pages/explore").then((m) => ({ default: m.NotFound })));
const Quote = lazy(() => import("./pages/quote").then((m) => ({ default: m.Quote })));
const Track = lazy(() => import("./pages/quote").then((m) => ({ default: m.Track })));
const Legal = lazy(() => import("./pages/legal"));

function App() {
  return (
    <Provider>
      <SEO />
      <Layout>
        <Suspense
          fallback={
            <output className="container page-loading" aria-label="Loading page">
              <div className="loading-line" />
              <div className="loading-line" />
              <p>Getting your next chapter ready…</p>
            </output>
          }
        >
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/destinations" component={Destinations} />
            <Route path="/destinations/:slug" component={DestinationDetail} />
            <Route path="/services" component={Services} />
            <Route path="/services/:slug" component={ServiceDetail} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/quote" component={Quote} />
            <Route path="/track" component={Track} />
            <Route path="/privacy" component={Legal} />
            <Route path="/terms" component={Legal} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
    </Provider>
  );
}

export default App;
