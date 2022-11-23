//ACA IMPORTAMOS TODOS PARA OCUPARLAS
// LAS SEPARAMOS EN DOS TIPOS ICON Y IMAGE LAS ICON SON SVG

import { ReactComponent as LogoCentral } from "./svg/logoCentral.svg";
// importar como componente solo se puede con los svg no con los jpg o los png

import authBg from "./jpg/auth-bg.jpg";
import homeBanner from "./jpg/home-banner.jpg";
import noAvatar from "./jpg/no-avatar.jpg";

import academyLogo from "./png/academy-logo.png";

const Icon = {
  // este va con mayuscula porque es un componente
  // lo hago asi para poder usar Icon.Logowhite, Icon.authBg
  LogoCentral,
};

const image = {
  authBg,
  homeBanner,
  noAvatar,
  academyLogo,
};

export { Icon, image }; // asi lo exporte
