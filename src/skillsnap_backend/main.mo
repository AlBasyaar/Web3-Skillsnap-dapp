import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

actor {
    // Struktur data proyek
    public type Project = {
        id: Nat;
        bidangMinat: Text;
        aktifitasSuka: Text;
        toolsDikuasai: Text;
        kerjaTim: Text;
        strukturKerja: Text;
        tantanganStabil: Text;
        variasiKerja: Text;

        pendidikanTerakhir: Text;
        bersediaBelajar: Text;

        tipeKerja: Text;
        lokasiKerja: Text;

        kepribadian: [Text];

        aiRekomendasi: ?Text; // Menyimpan hasil rekomendasi oleh AI
    };

    // Penyimpanan proyek
    stable var projects : [Project] = [];
    stable var nextId : Nat = 1;

    // CREATE
    public func createProject(bidangMinat: Text, aktifitasSuka: Text, toolsDikuasai: Text, kerjaTim: Text, strukturKerja: Text, tantanganStabil: Text, variasiKerja: Text, pendidikanTerakhir: Text, bersediaBelajar: Text, tipeKerja: Text, lokasiKerja: Text, kepribadian: [Text]) : async Nat {
        let project : Project = {
            id = nextId;
            bidangMinat = bidangMinat;
            aktifitasSuka = aktifitasSuka;
            toolsDikuasai = toolsDikuasai;
            kerjaTim = kerjaTim;
            strukturKerja = strukturKerja;
            tantanganStabil = tantanganStabil;
            variasiKerja = variasiKerja;
            pendidikanTerakhir = pendidikanTerakhir;
            bersediaBelajar = bersediaBelajar;
            tipeKerja = tipeKerja;
            lokasiKerja = lokasiKerja;
            kepribadian = kepribadian;
            aiRekomendasi = null; // Inisialisasi rekomendasi AI sebagai null
        };
        projects := Array.append<Project>(projects, [project]);
        nextId += 1;
        return project.id;
    };

    // READ - semua proyek
    public query func getProjects() : async [Project] {
        return projects;
    };

    // READ - proyek by id
    public query func getProjectById(id: Nat) : async ?Project {
        for (project in projects.vals()) {
            if (project.id == id) {
                return ?project;
            }
        };
        return null;
    };

    // UPDATE
    public func updateProject(id: Nat, bidangMinat: Text, aktifitasSuka: Text, toolsDikuasai: Text, kerjaTim: Text, strukturKerja: Text, tantanganStabil: Text, variasiKerja: Text, pendidikanTerakhir: Text, bersediaBelajar: Text, tipeKerja: Text, lokasiKerja: Text, kepribadian: [Text]) : async Bool {
        var found = false;
        projects := Array.map<Project, Project>(projects, func (project) {
            if (project.id == id) {
                found := true;
                {
                    id = id;
                    bidangMinat = bidangMinat;
                    aktifitasSuka = aktifitasSuka;
                    toolsDikuasai = toolsDikuasai;
                    kerjaTim = kerjaTim;
                    strukturKerja = strukturKerja;
                    tantanganStabil = tantanganStabil;
                    variasiKerja = variasiKerja;
                    pendidikanTerakhir = pendidikanTerakhir;
                    bersediaBelajar = bersediaBelajar;
                    tipeKerja = tipeKerja;
                    lokasiKerja = lokasiKerja;
                    kepribadian = kepribadian;
                    aiRekomendasi = project.aiRekomendasi; // Tetap simpan rekomendasi AI yang ada
                }
            } else {
                project
            }
        });
        return found;
    };

    // DELETE
    public func deleteProject(id: Nat) : async Bool {
        let beforeLen = projects.size();
        projects := Array.filter<Project>(projects, func (project) { project.id != id });
        let afterLen = projects.size();
        return afterLen < beforeLen;
    };

    // Fungsi untuk menyimpan hasil rekomendasi oleh AI
    public func saveAIRecommendation(projectId: Nat, hasil: Text): async () {
        // Custom findIndex karena Array.findIndex tidak tersedia di Motoko
        func findIndex<T>(arr: [T], pred: T -> Bool): ?Nat {
            var i = 0;
            label l for (item in arr.vals()) {
                if (pred(item)) {
                    return ?i;
                };
                i += 1;
            };
            return null;
        };

        let maybeIndex = findIndex<Project>(projects, func (project) { project.id == projectId });

        switch (maybeIndex) {
            case (?idx) {
                let updated = Array.tabulate<Project>(
                    projects.size(),
                    func(i) {
                        if (i == idx) {
                            let old = projects[i];
                            {
                                id = old.id;
                                bidangMinat = old.bidangMinat;
                                aktifitasSuka = old.aktifitasSuka;
                                toolsDikuasai = old.toolsDikuasai;
                                kerjaTim = old.kerjaTim;
                                strukturKerja = old.strukturKerja;
                                tantanganStabil = old.tantanganStabil;
                                variasiKerja = old.variasiKerja;
                                pendidikanTerakhir = old.pendidikanTerakhir;
                                bersediaBelajar = old.bersediaBelajar;
                                tipeKerja = old.tipeKerja;
                                lokasiKerja = old.lokasiKerja;
                                kepribadian = old.kepribadian;
                                aiRekomendasi = ?hasil; // simpan hasil AI
                            }
                        } else {
                            projects[i]
                        }
                    }
                );
                projects := updated;
            };
            case null {
                Debug.print("Project with id " # Nat.toText(projectId) # " not found.");
            }
        };
    };

    //Fungsi untuk menmbaca hasil rekomendasi AI
    public func getAIRecommendation(projectId: Nat): async ?Text {
    for (project in projects.vals()) {
        if (project.id == projectId) {
            return project.aiRekomendasi;
        };
    };
        return null;
    }


}
