import {
  getKategori,
  getPenilaian,
  getPeriode,
  getPertanyaan,
  getPublicSurvey,
  getResponden,
} from "./survey.js";

// console.log("===================GET Prodi================")
// const prodi = await getProdi()
// console.log(prodi)

console.log("===================GET Kategori================");
const kategori = await getKategori();
console.log(kategori);

console.log("===============GET Pertanyaan===================");
const pertanyaan = await getPertanyaan();
console.log(pertanyaan);

console.log("===============GET Periode ===============================");
const periode = await getPeriode();
console.log(periode);

console.log("===============GET Survey ===============================");
const survey = await getPublicSurvey();
console.log(survey);

console.log("=============== GET Responden ===============================");
const responden = await getResponden();
console.log(responden);

console.log("===============GET Penilaian ===============================");
const penilaian = await getPenilaian();
console.log(penilaian);
