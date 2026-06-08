import axios from "axios";

const API_URL =
  "https://ajslhihnqqpjruixnhwr.supabase.co/rest/v1/note";

const API_KEY =
  "sb_publishable_6LNq4WFRvv83aepU6WEHDA_KLvxdBtF";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const notesAPI = {
  // Ambil semua data
  async fetchNotes() {
    const response = await axios.get(API_URL, {
      headers,
    });

    return response.data;
  },

  // Tambah data
  async createNote(data) {
    const response = await axios.post(
      API_URL,
      data,
      { headers }
    );

    return response.data;
  },

  // Hapus data
  async deleteNote(id) {
    await axios.delete(
      `${API_URL}?id=eq.${id}`,
      { headers }
    );
  },
};