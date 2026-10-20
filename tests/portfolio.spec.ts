import { test, expect } from "@playwright/test";

test("la portada tiene escena propia, navegación y documentos reales", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator(".intro-screen")).toHaveCount(0);
  await expect(page.locator("#story")).toHaveClass(/has-scene/);
  await expect(page.locator(".scene-sticky canvas")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "JHOANDRY",
  );
  await page
    .getByRole("navigation", { name: "Navegación principal" })
    .getByRole("link", { name: "Sobre mí" })
    .click();
  await expect(page.locator("#about")).toBeInViewport();
  for (const path of [
    "/CV_JHOANDRY.pdf",
    "/certificates/CertificadoWordpress.pdf",
    "/certificates/certificado-fundamentos-web.pdf",
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  }
});

test("los servicios se pueden expandir con teclado", async ({ page }) => {
  await page.goto("/#services");
  const backend = page.getByRole("button", { name: /BACKEND & SISTEMAS/ });
  await backend.focus();
  await backend.press("Enter");
  await expect(backend).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-body-1 .tool-tags")).toBeVisible();
  await backend.press("Enter");
  await expect(backend).toHaveAttribute("aria-expanded", "false");
});

test("la galería responde a los controles y conduce al catálogo", async ({
  page,
}) => {
  await page.goto("/#projects");
  await expect(page.locator("#projects")).toHaveClass(/is-horizontal/);
  await page.getByRole("button", { name: "Ver siguientes proyectos" }).click();
  await expect
    .poll(async () =>
      page
        .locator(".project-track")
        .evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
        ),
    )
    .toBeLessThan(-100);
  await page.goto("/proyectos");
  await expect(page.locator(".all-project-card")).toHaveCount(7);
  await expect(
    page.getByRole("heading", { name: "Cada idea, un proyecto." }),
  ).toBeVisible();
});

test("el catálogo filtra proyectos y la vista ampliada funciona con Escape", async ({
  page,
}) => {
  await page.goto("/proyectos");
  await page.getByRole("button", { name: "Backend", exact: true }).click();
  await expect(page.locator(".all-project-card")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "PostulaPe", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Aplicaciones", exact: true }).click();
  await expect(page.locator(".all-project-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Ampliar imagen de EquilibrioS" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("img", { name: "Vista ampliada del proyecto EquilibrioS" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ampliar imagen de EquilibrioS" }),
  ).toBeFocused();
  await page.getByRole("button", { name: /Todos/ }).click();
  await expect(page.locator(".all-project-card")).toHaveCount(7);
  await expect(page.locator('.all-project-links a[href="#"]')).toHaveCount(0);
});

test("tablet permite entrar y navegar sin depender de WebGL", async ({
  page,
}) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto("/");
  await expect(page.locator(".intro-screen")).toHaveCount(0);
  await expect(page.locator(".scene-sticky canvas")).toHaveCount(0);
  await page
    .getByRole("navigation", { name: "Navegación principal" })
    .getByRole("link", { name: "Contacto" })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("móvil conserva contenidos y permite expandir servicios", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".intro-screen")).toHaveCount(0);
  await expect(page.locator(".hero-portrait img")).toBeVisible();
  expect(
    await page
      .locator(".hero-portrait img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBe(true);
  const backend = page.getByRole("button", { name: /BACKEND & SISTEMAS/ });
  await backend.tap();
  await expect(backend).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#projects")).not.toHaveClass(/is-horizontal/);
  await expect(page.locator(".featured-project")).toHaveCount(5);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test("movimiento reducido mantiene la presentación y una galería vertical", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".intro-screen")).toHaveCount(0);
  await expect(page.locator(".scene-sticky canvas")).toHaveCount(0);
  await expect(page.locator(".hero-portrait img")).toBeVisible();
  await expect(page.locator("#projects")).not.toHaveClass(/is-horizontal/);
  expect(
    await page
      .locator(".role-rotator > span")
      .first()
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
});

test("el formulario muestra éxito sin enviar correos reales", async ({
  page,
}) => {
  let intercepted = false;
  await page.route("https://api.emailjs.com/**", async (route) => {
    intercepted = true;
    expect(route.request().method()).toBe("POST");
    expect(route.request().postData()).toContain("Prueba de formulario");
    await route.fulfill({ status: 200, contentType: "text/plain", body: "OK" });
  });
  await page.goto("/#contact");
  await page
    .getByLabel("Tu nombre", { exact: false })
    .fill("Prueba de formulario");
  await page
    .getByLabel("Tu correo", { exact: false })
    .fill("prueba@example.com");
  await page
    .getByLabel("Tu idea", { exact: false })
    .fill("Esta prueba se intercepta y no envía ningún correo.");
  await page.getByRole("button", { name: "ENVIAR MENSAJE" }).click();
  await expect(
    page.getByRole("heading", { name: /Gracias por/ }),
  ).toBeVisible();
  expect(intercepted).toBe(true);
  await page.getByRole("button", { name: "Enviar otro mensaje" }).click();
  await expect(page.getByLabel("Tu nombre", { exact: false })).toHaveValue("");
});

test("el formulario conserva el mensaje cuando falla y permite reintentar", async ({
  page,
}) => {
  let attempts = 0;
  await page.route("https://api.emailjs.com/**", async (route) => {
    attempts++;
    await route.fulfill({
      status: attempts === 1 ? 500 : 200,
      contentType: "text/plain",
      body: attempts === 1 ? "Error simulado" : "OK",
    });
  });
  await page.goto("/#contact");
  await page
    .getByLabel("Tu nombre", { exact: false })
    .fill("Prueba de recuperación");
  await page
    .getByLabel("Tu correo", { exact: false })
    .fill("prueba@example.com");
  await page
    .getByLabel("Tu idea", { exact: false })
    .fill("Este mensaje debe conservarse después del fallo.");
  await page.getByRole("button", { name: "ENVIAR MENSAJE" }).click();
  await expect(
    page.getByText("No se pudo enviar el mensaje.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByLabel("Tu idea", { exact: false })).toHaveValue(
    "Este mensaje debe conservarse después del fallo.",
  );
  await page.getByRole("button", { name: "ENVIAR MENSAJE" }).click();
  await expect(
    page.getByRole("heading", { name: /Gracias por/ }),
  ).toBeVisible();
  expect(attempts).toBe(2);
});

test("el ajedrez responde a una jugada y permite girar y reiniciar", async ({
  page,
}) => {
  await page.goto("/laboratorio");
  await expect(page.locator(".chess-square")).toHaveCount(64);
  await page.locator('[data-square="e2"]').click();
  await expect(page.locator(".legal-move")).toHaveCount(2);
  await page.locator('[data-square="e4"]').click();
  await expect(page.locator(".move-row").first()).toContainText("e4");
  await expect(
    page.locator(".move-row").first().locator("span").nth(2),
  ).not.toHaveText("—");
  await expect(page.locator(".game-status")).toContainText("Tu turno");
  await page.getByRole("button", { name: "Girar tablero" }).click();
  await expect(page.locator(".chess-square").first()).toHaveAttribute(
    "data-square",
    "h1",
  );
  await page
    .getByRole("button", { name: "Nueva partida", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Nueva partida" })
    .click();
  await expect(page.locator(".move-row")).toHaveCount(0);
  await expect(page.locator(".game-status")).toContainText("Tu turno");
});

test("la guía orienta hacia proyectos y contacto con información del portafolio", async ({
  page,
}) => {
  await page.goto("/laboratorio");
  await page.getByRole("button", { name: "¿Qué proyectos tienes?" }).click();
  await expect(page.locator(".chat-bubble.guide").last()).toContainText(
    "PostulaPe",
  );
  await expect(
    page.getByRole("link", { name: "Explorar los siete proyectos" }),
  ).toHaveAttribute("href", "/proyectos");
  await page
    .getByLabel("Pregunta sobre el portafolio")
    .fill("¿Estás disponible?");
  await page.getByRole("button", { name: "Enviar pregunta a la guía" }).click();
  await expect(page.locator(".chat-bubble.guide").last()).toContainText(
    "jhoandryoficial@gmail.com",
  );
  await expect(
    page.getByRole("link", { name: "Conversar con Jhoandry" }),
  ).toHaveAttribute("href", "/#contact");
});

test("la portada sigue siendo accesible si WebGL no está disponible", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: () => null,
    });
  });
  await page.goto("/");
  await expect(page.locator(".intro-screen")).toHaveCount(0);
  await expect(page.locator("#story")).not.toHaveClass(/has-scene/);
  await expect(page.locator(".hero-portrait img")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Navegación principal" })
    .getByRole("link", { name: "Contacto" })
    .click();
  await expect(page.locator("#contact")).toBeInViewport();
});
