import axios from "axios";
import "dotenv/config";
import { NetworkError, SurveyError } from "./error_custom/error.js";
import { string } from "zod/v3";

const apiClient = axios.create({
  baseURL: process.env.SURVEY_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SURVEY_API_TOKEN}`,
  },
});

// Interface untuk Kategori
interface Kategori {
  id: number;
  ktg_nama: string;
}

interface KategoriResponse {
  data: Kategori[];
  current_page: number;
  last_page: number;
  total: number;
}

// get kategori
export async function getKategori(
  search?: string,
  page: number = 1,
): Promise<KategoriResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());

  try {
    const res = await apiClient.get(`/kategori?${params.toString()}`);
    const paginationData = res.data.data;
    const items = paginationData.data;

    return {
      data: items.map((item: any) => ({
        id: item.id,
        ktg_nama: item.ktg_nama,
      })),
      current_page: paginationData.current_page,
      last_page: paginationData.last_page,
      total: paginationData.total,
    };
  } catch (error) {
    if (error instanceof SurveyError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw SurveyError.fromResponse(error.response);
      }
      throw new NetworkError(error.message || "Gagal terhubung ke server");
    }

    throw new Error(`Gagal mengambil kategori: ${error}`);
  }
}

// Pertanyaan
interface PertanyaanResponse {
  data: Pertanyaan[];
  current_page: number;
  last_page: number;
  total: number;
}

interface Pertanyaan {
  id: number;
  ktg_nama: string;
  prtn_isi: string;
}

export async function getPertanyaan(
  search?: string,
  page: number = 1,
): Promise<PertanyaanResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());

  try {
    const res = await apiClient.get(`/pertanyaan?${params.toString()}`);
    const paginationData = res.data.data;
    const items = paginationData.data;

    return {
      data: items.map((i: any) => ({
        id: i.id,
        ktg_nama: i.kategori.ktg_nama,
        prtn_isi: i.prtn_isi,
      })),
      current_page: paginationData.current_page,
      last_page: paginationData.last_page,
      total: paginationData.total,
    };
  } catch (error) {
    if (error instanceof SurveyError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const surveyError = SurveyError.fromResponse(error.response);
        throw surveyError;
      }
      throw new NetworkError(error.message || "Gagal terhubung ke server");
    }

    // Handle unknown errors
    throw new Error(`Gagal mengambil pertanyaan: ${error}`);
  }
}
// Periode
interface periodeResponse {
  data: periode[];
  current_page: number;
  last_page: number;
  total: number;
}

interface periode {
  id: number;
  kategori: string;
  prd_tgl_mulai: Date;
  prd_tgl_selesai: Date;
}

export async function getPeriode(
  search?: string,
  page: number = 1,
): Promise<periodeResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());

  try {
    const res = await apiClient.get(`/periode?${params.toString()}`);
    const dataPeriode = res.data.data.data;
    const paginationData = res.data.data;

    return {
      data: dataPeriode.map((i: any) => ({
        id: i.id,
        kategori: i.kategori.ktg_nama,
        prd_tgl_mulai: i.prd_tgl_mulai,
        prd_tgl_selesai: i.prd_tgl_selesai,
      })),
      current_page: paginationData.current_page,
      last_page: paginationData.last_page,
      total: paginationData.total,
    };
  } catch (err) {
    if (err instanceof SurveyError) {
      throw err;
    }
    if (err instanceof NetworkError) {
      throw err;
    }
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const surveyError = SurveyError.fromResponse(err.response);
        throw surveyError;
      }
    }
    throw new Error(`Gagal ambil data periode ${err}`);
  }
}

// Public Survey
interface surveyResponse {
  data: survey[];
  current_page: number;
  last_page: number;
  total: number;
}
interface survey {
  id: number;
  nama_user: string;
  periode_tgl_mulai: Date;
  periode_tgl_selesai: Date;
  kategori: string;
  title: string;
  slug: string;
  status: boolean;
  linkSurvei: string;
}

export async function getPublicSurvey(
  search?: string,
  page: number = 1,
): Promise<surveyResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());

  try {
    const res = await apiClient.get(`/survey?${params.toString()}`);
    const data = res.data.survey.data;
    const paginationData = res.data.survey;

    return {
      data: data.map((i: any) => ({
        id: i.id,
        nama_user: i.user.name,
        periode_tgl_mulai: i.periode.prd_tgl_mulai,
        periode_tgl_selesai: i.periode.prd_tgl_selesai,
        kategori: i.category.ktg_nama,
        title: i.title,
        slug: i.slug,
        status: i.status,
        linkSurvei: `http://localhost:5173/survey/${i.slug}`,
      })),
      current_page: paginationData.current_page,
      last_page: paginationData.last_page,
      total: paginationData.total,
    };
  } catch (err) {
    if (err instanceof SurveyError) {
      throw err;
    }
    if (err instanceof NetworkError) {
      throw err;
    }
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const surveyError = SurveyError.fromResponse(err.response);
        throw surveyError;
      }
      throw new NetworkError(err.message || "Gagal terhubung ke server");
    }
    throw new Error(`Gagal mengambil survey: ${err}`);
  }
}

// Responden
interface respondeResponse {
  data: responden[];
  current_page: number;
  last_page: number;
  total: number;
}

interface responden {
  id: number;
  tanggal_pengerjaan: Date;
  svy_nama: string;
  svy_jabatan: string;
  svy_nomor_whatsapp: string;
}

export async function getResponden(
  search?: string,
  page: number = 1,
): Promise<respondeResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());

  try {
    const res = await apiClient.get(`/responden?${params.toString()}`);
    const data = res.data.data.data;
    const paginationData = res.data.data;

    return {
      data: data.map((i: any) => ({
        id: i.id,
        tanggal_pengerjaan: i.created_at,
        svy_nama: i.svy_nama,
        svy_jabatan: i.svy_jabatan,
        svy_nomor_whatsapp: i.svy_nomor_whatsapp,
      })),
      current_page: paginationData.current_page,
      last_page: paginationData.last_page,
      total: paginationData.total,
    };
  } catch (err) {
    if (err instanceof SurveyError) {
      throw err;
    }
    if (err instanceof NetworkError) {
      throw err;
    }
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const surveyError = SurveyError.fromResponse(err.response);
        throw surveyError;
      }
    }
    throw new Error(`Gagal mengambil data responden: ${err}`);
  }
}

// Penilaian
interface penilainResponse {
  data: penilaian[];
  current_page: number;
  last_page: number;
  total: number;
}

interface penilaian {
  id: number;
  nama_responden: string;
  jabatan: string;
  nomor_whatsapp: string;
  periode: Date;
  skor: number;
}

export async function getPenilaian(
  search?: string,
  page: number = 1,
): Promise<penilainResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());

  try {
    const res = await apiClient.get(`/penilaian?${params.toString()}`);
    const data = res.data.data.data;
    const paginationData = res.data.data;

    return {
      data: data.map((i: any) => ({
        id: i.id,
        nama_responden: i.responden.svy_nama,
        jabatan: i.responden.svy_jabatan,
        nomor_whatsapp: i.responden.svy_nomor_whatsapp,
      })),
      current_page: paginationData.current_page,
      last_page: paginationData.last_page,
      total: paginationData.total,
    };
  } catch (err) {
    if (err instanceof SurveyError) {
      throw err;
    }
    if (err instanceof NetworkError) {
      throw err;
    }
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const surveyError = SurveyError.fromResponse(err.response);
        throw surveyError;
      }
    }
    throw new Error(`Gagal mengambil data penilaian: ${err}`);
  }
}
// ====================== POST ====================
// Post Kategori
interface responsePostKategori {
  data: kategori;
  message: string;
}
interface kategori {
  id: number;
  kategori: string;
}
interface kategoriCreate {
  ktg_nama: string;
}

export async function postKategori(
  kategori: kategoriCreate,
): Promise<responsePostKategori> {
  try {
    const res = await apiClient.post("/kategori", kategori);
    const data = res.data.data;
    const responsePost = res.data;

    return {
      data: {
        id: data.id,
        kategori: data.ktg_nama,
      },
      message: responsePost.message,
    };
  } catch (error) {
    if (error instanceof SurveyError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw SurveyError.fromResponse(error.response);
      }
      throw new NetworkError(error.message || "Gagal terhubung ke server");
    }

    throw new Error(`Gagal mengirim kategori: ${error}`);
  }
}
// Post Pertanyaan
interface dataPertanyaan {
  id: number;
  pertanyaan: string;
}

interface responsePostPertanyaan {
  message: string;
  data: dataPertanyaan;
}

interface pertanyaanCreate {
  ktg_id: number;
  prtn_isi: string;
}

export async function postPertanyaan(
  pertanyaan: pertanyaanCreate,
): Promise<responsePostPertanyaan> {
  try {
    const res = await apiClient.post(`/pertanyaan`, pertanyaan);
    const data = res.data.data;
    const responsePost = res.data;

    return {
      data: {
        id: data.id,
        pertanyaan: data.prtn_isi,
      },
      message: responsePost.message,
    };
  } catch (error) {
    if (error instanceof SurveyError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw SurveyError.fromResponse(error.response);
      }
      throw new NetworkError(error.message || "Gagal terhubung ke server");
    }

    throw new Error(`Gagal mengirim pertanyaan: ${error}`);
  }
}

// Post Periode
interface postResponsePeriode {
  data: periodeData;
  message: string;
}
interface periodeData {
  id: number;
  periode_mulai: Date;
  periode_selesai: Date;
  status: number;
}
interface periodeCreate {
  ktg_id: number;
  prd_tgl_mulai: Date;
  prd_tgl_selesai: Date;
  prd_status: number;
}
export async function postPeriode(
  periode: periodeCreate,
): Promise<postResponsePeriode> {
  try {
    const res = await apiClient.post("/periode", periode);
    const data = res.data.data;
    const responsePost = res.data;

    return {
      data: {
        id: data.id,
        periode_mulai: data.prd_tgl_mulai,
        periode_selesai: data.prd_tgl_selesai,
        status: data.prd_status,
      },
      message: responsePost.message,
    };
  } catch (error) {
    if (error instanceof SurveyError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw SurveyError.fromResponse(error.response);
      }
      throw new NetworkError(error.message || "Gagal terhubung ke server");
    }

    throw new Error(`Gagal mengirim periode: ${error}`);
  }
}

// Public Sruvey
interface postResponseSurvey {
  data: dataSurvey;
  message: string;
}
interface dataSurvey {
  id: number;
  title: string;
  description: string;
  url: string;
}
interface surveyCreate {
  title: string;
  description: string;
  period_id: number;
  category_id: number;
  status: boolean;
}
export async function postPublicSurvey(
  survey: surveyCreate,
): Promise<postResponseSurvey> {
  try {
    const res = await apiClient.post("/survey", survey);
    const data = res.data.data;
    const responseSurvey = res.data;

    return {
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        url: `http://localhost:5173/survey/${data.slug}`,
      },
      message: responseSurvey.message,
    };
  } catch (error) {
    if (error instanceof SurveyError) {
      throw error;
    }
    if (error instanceof NetworkError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw SurveyError.fromResponse(error.response);
      }
      throw new NetworkError(error.message || "Gagal terhubung ke server");
    }

    throw new Error(`Gagal mengirim survey: ${error}`);
  }
}
