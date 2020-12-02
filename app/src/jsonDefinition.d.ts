declare module jsonImport {

    export interface Param {
        name: string;
        units: string;
        $: string;
    }

    export interface Wx {
        Param: Param[];
    }

    export interface Rep {
        D: string;
        F: string;
        G: string;
        H: string;
        Pp: string;
        S: string;
        T: string;
        V: string;
        W: string;
        U: string;
        $: string;
    }

    export interface Period {
        type: string;
        value: string;
        Rep: Rep[];
    }

    export interface Location {
        i: string;
        lat: string;
        lon: string;
        name: string;
        country: string;
        continent: string;
        elevation: string;
        Period: Period[];
    }

    export interface DV {
        dataDate: Date;
        type: string;
        Location: Location;
    }

    export interface SiteRep {
        Wx: Wx;
        DV: DV;
    }

    export interface RootObject {
        SiteRep: SiteRep;
    }

}

