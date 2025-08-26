import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor {
    public type Project = {
        id: Nat;
        owner: Principal; // identitas Internet Identity pemilik data
        bidang: Text;
        aktifitas: Text;
        keterampilan: Text;
        preferensiKerja: Text;
        tipePekerjaan: Text;
        tantangan: Text;
        variasiPekerjaan: Text;
        pendidikan: Text;
        belajarSkillBaru: Text;
        tipeTempatKerja: Text;
        lokasiKerja: Text;
        waktuLuang: Text;
        kepercayaan: Text;
        pemecahanMasalah: Text;
        gayaKerja: Text;
        acaraSosial: Text;
        preferensiPekerjaan: Text;
        pengambilanKeputusan: Text;
        kenyamananKerja: Text;
        gayaKomunikasi: Text;
        gayaBelajar: Text;
        aiRekomendasi: ?Text;
    };

    stable var projects : [Project] = [];
    stable var nextId : Nat = 1;

    // CREATE
    public shared(msg) func createProject(
        bidang: Text, aktifitas: Text, keterampilan: Text,
        preferensiKerja: Text, tipePekerjaan: Text, tantangan: Text,
        variasiPekerjaan: Text, pendidikan: Text, belajarSkillBaru: Text,
        tipeTempatKerja: Text, lokasiKerja: Text, waktuLuang: Text,
        kepercayaan: Text, pemecahanMasalah: Text, gayaKerja: Text,
        acaraSosial: Text, preferensiPekerjaan: Text, pengambilanKeputusan: Text,
        kenyamananKerja: Text, gayaKomunikasi: Text, gayaBelajar: Text
    ) : async Nat {
        let callerPrincipal = msg.caller; // identitas II yang login

        let project : Project = {
            id = nextId;
            owner = callerPrincipal;
            bidang = bidang;
            aktifitas = aktifitas;
            keterampilan = keterampilan;
            preferensiKerja = preferensiKerja;
            tipePekerjaan = tipePekerjaan;
            tantangan = tantangan;
            variasiPekerjaan = variasiPekerjaan;
            pendidikan = pendidikan;
            belajarSkillBaru = belajarSkillBaru;
            tipeTempatKerja = tipeTempatKerja;
            lokasiKerja = lokasiKerja;
            waktuLuang = waktuLuang;
            kepercayaan = kepercayaan;
            pemecahanMasalah = pemecahanMasalah;
            gayaKerja = gayaKerja;
            acaraSosial = acaraSosial;
            preferensiPekerjaan = preferensiPekerjaan;
            pengambilanKeputusan = pengambilanKeputusan;
            kenyamananKerja = kenyamananKerja;
            gayaKomunikasi = gayaKomunikasi;
            gayaBelajar = gayaBelajar;
            aiRekomendasi = null;
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

        // GET berdasarkan kode anchor (principal)
    public query func getProjectsByOwner(ownerText: Text) : async [Project] {
        let ownerPrincipal = Principal.fromText(ownerText);
        return Array.filter<Project>(projects, func(p: Project) : Bool {
            p.owner == ownerPrincipal
        });
    };

    // UPDATE
    public func updateProject(id: Nat, bidang: Text, aktifitas: Text, keterampilan: Text, preferensiKerja: Text, tipePekerjaan: Text, tantangan: Text, variasiPekerjaan: Text, pendidikan: Text, belajarSkillBaru: Text, tipeTempatKerja: Text, lokasiKerja: Text, waktuLuang:Text, kepercayaan:Text, pemecahanMasalah:Text, gayaKerja:Text, acaraSosial:Text, preferensiPekerjaan:Text, pengambilanKeputusan:Text, kenyamananKerja:Text, gayaKomunikasi:Text, gayaBelajar:Text) : async Bool {
        var found = false;
        projects := Array.map<Project, Project>(projects, func (project) {
            if (project.id == id) {
                found := true;
                {
                    id = id;
                    owner = project.owner;
                    bidang = bidang;
                    aktifitas = aktifitas;
                    keterampilan = keterampilan;
                    preferensiKerja = preferensiKerja;
                    tipePekerjaan = tipePekerjaan;
                    tantangan = tantangan;
                    variasiPekerjaan = variasiPekerjaan;
                    pendidikan = pendidikan;
                    belajarSkillBaru = belajarSkillBaru;
                    tipeTempatKerja = tipeTempatKerja;
                    lokasiKerja = lokasiKerja;
                    waktuLuang = waktuLuang;
                    kepercayaan = kepercayaan;
                    pemecahanMasalah = pemecahanMasalah;
                    gayaKerja = gayaKerja;
                    acaraSosial = acaraSosial;
                    preferensiPekerjaan = preferensiPekerjaan;
                    pengambilanKeputusan = pengambilanKeputusan;
                    kenyamananKerja = kenyamananKerja;
                    gayaKomunikasi = gayaKomunikasi;
                    gayaBelajar = gayaBelajar;
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
                                owner = old.owner;
                                bidang = old.bidang;
                                aktifitas = old.aktifitas;
                                keterampilan = old.keterampilan;
                                preferensiKerja = old.preferensiKerja;
                                tipePekerjaan = old.tipePekerjaan;
                                tantangan = old.tantangan;
                                variasiPekerjaan = old.variasiPekerjaan;
                                pendidikan = old.pendidikan;
                                belajarSkillBaru = old.belajarSkillBaru;
                                tipeTempatKerja = old.tipeTempatKerja;
                                lokasiKerja = old.lokasiKerja;
                                waktuLuang = old.waktuLuang;
                                kepercayaan = old.kepercayaan;
                                pemecahanMasalah = old.pemecahanMasalah;
                                gayaKerja = old.gayaKerja;
                                acaraSosial = old.acaraSosial;
                                preferensiPekerjaan = old.preferensiPekerjaan;
                                pengambilanKeputusan = old.pengambilanKeputusan;
                                kenyamananKerja = old.kenyamananKerja;
                                gayaKomunikasi = old.gayaKomunikasi;
                                gayaBelajar = old.gayaBelajar;
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
