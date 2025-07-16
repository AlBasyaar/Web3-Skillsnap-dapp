import Array "mo:base/Array";

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
}
