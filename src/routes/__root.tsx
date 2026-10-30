import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">٤٠٤</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.</p>
        <div className="mt-6">
          <Link to="/" className="btn-ink">العودة للرئيسية</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">تعذّر تحميل الصفحة</h1>
        <p className="mt-2 text-sm text-muted-foreground">حدث خطأ ما. حاول التحديث أو العودة للرئيسية.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-ink">حاول مجدداً</button>
          <a href="/" className="btn-outline">الرئيسية</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "رواق | لوحات فنية جدارية فاخرة" },
      { name: "description", content: "متجر سعودي للوحات الجدارية الفاخرة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        {isAdmin ? (
          <Outlet />
        ) : (
          <>
            <SiteHeader />
            <main className="min-h-[60vh]"><Outlet /></main>
            <SiteFooter />
          </>
        )}
        <Toaster position="top-center" dir="rtl" richColors />
      </StoreProvider>
    </QueryClientProvider>
  );
}
