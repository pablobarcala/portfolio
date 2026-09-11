import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  resolveAvatarBadge,
  DEFAULT_AVATAR_BADGE,
} from "../utils/avatarBadge.ts";
import { PORTFOLIO_DATA } from "../data/portfolioData.ts";
import { PROFILE_QUERY } from "../sanity/queries.ts";

describe("FEAT-053: Avatar Badge Resolution & Localization", () => {
  describe("Escenario 1 & 2: Visualización con idioma 'es' y 'en'", () => {
    it("debe retornar la etiqueta personalizada en Español cuando el idioma activo es 'es'", () => {
      const badge = { es: "Sobre mí", en: "About me" };
      const result = resolveAvatarBadge(badge, "es");
      assert.strictEqual(result, "Sobre mí");
    });

    it("debe retornar la etiqueta personalizada en Inglés cuando el idioma activo es 'en'", () => {
      const badge = { es: "Sobre mí", en: "About me" };
      const result = resolveAvatarBadge(badge, "en");
      assert.strictEqual(result, "About me");
    });

    it("debe retornar el nuevo texto cuando se actualiza la etiqueta de perfil (Escenario: Actualización de la etiqueta tras edición)", () => {
      const updatedBadge = { es: "Mi Perfil", en: "My Profile" };
      assert.strictEqual(resolveAvatarBadge(updatedBadge, "es"), "Mi Perfil");
      assert.strictEqual(resolveAvatarBadge(updatedBadge, "en"), "My Profile");
    });

    it("debe usar 'es' por defecto cuando no se pasa el parámetro de idioma", () => {
      const badge = { es: "Perfil Español", en: "Profile English" };
      assert.strictEqual(resolveAvatarBadge(badge), "Perfil Español");
      assert.strictEqual(resolveAvatarBadge(), "Sobre mí");
    });
  });

  describe("Escenario 3: Fallback por defecto cuando no hay campo en Sanity", () => {
    it("debe retornar 'Sobre mí' por defecto si avatarBadge es undefined para idioma 'es'", () => {
      const result = resolveAvatarBadge(undefined, "es");
      assert.strictEqual(result, "Sobre mí");
    });

    it("debe retornar 'About me' por defecto si avatarBadge es undefined para idioma 'en'", () => {
      const result = resolveAvatarBadge(undefined, "en");
      assert.strictEqual(result, "About me");
    });

    it("debe retornar valores por defecto si avatarBadge es null", () => {
      assert.strictEqual(resolveAvatarBadge(null, "es"), "Sobre mí");
      assert.strictEqual(resolveAvatarBadge(null, "en"), "About me");
    });

    it("DEFAULT_AVATAR_BADGE debe contener los textos por defecto para español e inglés", () => {
      assert.strictEqual(DEFAULT_AVATAR_BADGE.es, "Sobre mí");
      assert.strictEqual(DEFAULT_AVATAR_BADGE.en, "About me");
    });

    it("PORTFOLIO_DATA.profile debe tener configurado avatarBadge por defecto", () => {
      assert.ok(PORTFOLIO_DATA.profile.avatarBadge, "PORTFOLIO_DATA.profile.avatarBadge must be defined");
      assert.strictEqual(PORTFOLIO_DATA.profile.avatarBadge.es, "Sobre mí");
      assert.strictEqual(PORTFOLIO_DATA.profile.avatarBadge.en, "About me");
    });
  });

  describe("Escenario 4: Fallback al idioma alternativo si uno falta", () => {
    it("debe usar el valor en Español si falta la traducción en Inglés", () => {
      const badgeOnlyEs = { es: "Sobre mí", en: undefined };
      const result = resolveAvatarBadge(badgeOnlyEs, "en");
      assert.strictEqual(result, "Sobre mí");
    });

    it("debe usar el valor en Inglés si falta la traducción en Español", () => {
      const badgeOnlyEn = { es: undefined, en: "About me" };
      const result = resolveAvatarBadge(badgeOnlyEn, "es");
      assert.strictEqual(result, "About me");
    });

    it("debe usar el idioma alternativo si el idioma solicitado es string vacío", () => {
      const badgeEmptyEn = { es: "Sobre mí", en: "" };
      const result = resolveAvatarBadge(badgeEmptyEn, "en");
      assert.strictEqual(result, "Sobre mí");
    });

    it("debe usar el idioma alternativo en customDefaultBadge si el idioma solicitado está vacío", () => {
      const customDefaultEsOnly = { es: "Custom Solo ES", en: "" };
      const resultEn = resolveAvatarBadge(
        null,
        "en",
        "Fallback Name",
        customDefaultEsOnly
      );
      assert.strictEqual(resultEn, "Custom Solo ES");

      const customDefaultEnOnly = { es: "", en: "Custom Only EN" };
      const resultEs = resolveAvatarBadge(
        null,
        "es",
        "Fallback Name",
        customDefaultEnOnly
      );
      assert.strictEqual(resultEs, "Custom Only EN");
    });
  });

  describe("Escenario 5: Manejo de espacios en blanco vacíos (trim)", () => {
    it("debe ignorar espacios vacíos y recurrir al fallback por defecto si ambos idiomas tienen solo espacios", () => {
      const badgeSpaces = { es: "   ", en: "  \t " };
      const resultEs = resolveAvatarBadge(badgeSpaces, "es");
      const resultEn = resolveAvatarBadge(badgeSpaces, "en");
      assert.strictEqual(resultEs, "Sobre mí");
      assert.strictEqual(resultEn, "About me");
    });

    it("debe hacer trim a etiquetas válidas con espacios alrededor", () => {
      const badgeWithPadding = { es: "  Sobre mí  ", en: "  About me  " };
      assert.strictEqual(resolveAvatarBadge(badgeWithPadding, "es"), "Sobre mí");
      assert.strictEqual(resolveAvatarBadge(badgeWithPadding, "en"), "About me");
    });

    it("si el idioma activo tiene solo espacios, debe recurrir al idioma alternativo antes del default", () => {
      const badgeSpacesActive = { es: "Sobre mí", en: "    " };
      const result = resolveAvatarBadge(badgeSpacesActive, "en");
      assert.strictEqual(result, "Sobre mí");
    });

    it("debe hacer trim a customDefaultBadge tanto en idioma activo como alternativo", () => {
      const customDefault = { es: "  Default Trimmed  ", en: "  " };
      const resultEs = resolveAvatarBadge(null, "es", null, customDefault);
      assert.strictEqual(resultEs, "Default Trimmed");

      const resultAlt = resolveAvatarBadge(null, "en", null, customDefault);
      assert.strictEqual(resultAlt, "Default Trimmed");
    });

    it("debe hacer trim a profileNameFallback cuando se utiliza como fallback", () => {
      const result = resolveAvatarBadge(
        null,
        "es",
        "  Pablo Barcala  ",
        { es: "   ", en: "   " }
      );
      assert.strictEqual(result, "Pablo Barcala");
    });
  });

  describe("Escenario 6: Fallback a profile.name en última instancia", () => {
    it("debe retornar profile.name si no hay avatarBadge ni default disponible", () => {
      const customDefault = { es: "", en: "" };
      const result = resolveAvatarBadge(
        { es: "", en: "" },
        "es",
        "Pablo Barcala",
        customDefault
      );
      assert.strictEqual(result, "Pablo Barcala");
    });

    it("debe retornar string vacío '' si avatarBadge, customDefaultBadge y profileNameFallback son nulos, vacíos o espacios", () => {
      const result = resolveAvatarBadge(
        null,
        "es",
        "   ",
        { es: "  ", en: "  " }
      );
      assert.strictEqual(result, "");

      const resultAllEmpty = resolveAvatarBadge(
        { es: "  ", en: "  " },
        "en",
        "",
        { es: "", en: "" }
      );
      assert.strictEqual(resultAllEmpty, "");
    });
  });

  describe("Sanity PROFILE_QUERY", () => {
    it("debe incluir el campo avatarBadge en la proyección de la query", () => {
      assert.match(
        PROFILE_QUERY,
        /\bavatarBadge\b/,
        "PROFILE_QUERY must include avatarBadge in projection"
      );
    });
  });
});
