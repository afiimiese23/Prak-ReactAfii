import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import GenericTable from "../../components/GenericTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { notesAPI } from "../../services/notesAPI";

export default function Notes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [notes, setNotes] = useState([]);

    const [dataForm, setDataForm] = useState({
        title: "",
        content: "",
        status: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const loadNotes = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await notesAPI.fetchNotes();

            setNotes(data);
        } catch (err) {
            setError("Gagal memuat catatan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.createNote(dataForm);

            setSuccess("Catatan berhasil ditambahkan!");

            setDataForm({
                title: "",
                content: "",
                status: "",
            });

            setTimeout(() => {
                setSuccess("");
            }, 3000);

            loadNotes();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const konfirmasi = confirm(
            "Yakin ingin menghapus catatan ini?"
        );

        if (!konfirmasi) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.deleteNote(id);

            loadNotes();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <PageHeader title="Notes" />

            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    Notes App
                </h2>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    {success}
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tambah Catatan Baru
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="title"
                        value={dataForm.title}
                        placeholder="Judul catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    />

                    <textarea
                        name="content"
                        value={dataForm.content}
                        placeholder="Isi catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        rows="2"
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 resize-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-2xl"
                    >
                        {loading
                            ? "Mohon Tunggu..."
                            : "Tambah Data"}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold">
                        Daftar Catatan ({notes.length})
                    </h3>
                </div>

                {loading && (
                    <LoadingSpinner text="Memuat catatan..." />
                )}

                {!loading &&
                    notes.length === 0 &&
                    !error && (
                        <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
                    )}

                {!loading &&
                    notes.length === 0 &&
                    error && (
                        <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
                    )}

                {!loading &&
                    notes.length > 0 && (
                        <GenericTable
                            columns={[
                                "#",
                                "Judul",
                                "Isi Catatan",
                                "Aksi",
                            ]}
                            data={notes}
                            renderRow={(note, index) => (
                                <>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4">
                                        {note.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        {note.content}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    note.id
                                                )
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </>
                            )}
                        />
                    )}
            </div>
        </div>
    );
}