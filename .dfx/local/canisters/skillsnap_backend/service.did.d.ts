import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Project {
  'id' : bigint,
  'variasiKerja' : string,
  'tipeKerja' : string,
  'bersediaBelajar' : string,
  'tantanganStabil' : string,
  'kerjaTim' : string,
  'aiRekomendasi' : [] | [string],
  'strukturKerja' : string,
  'toolsDikuasai' : string,
  'lokasiKerja' : string,
  'aktifitasSuka' : string,
  'pendidikanTerakhir' : string,
  'kepribadian' : Array<string>,
  'bidangMinat' : string,
}
export interface _SERVICE {
  'createProject' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      Array<string>,
    ],
    bigint
  >,
  'deleteProject' : ActorMethod<[bigint], boolean>,
  'getAIRecommendation' : ActorMethod<[bigint], [] | [string]>,
  'getProjectById' : ActorMethod<[bigint], [] | [Project]>,
  'getProjects' : ActorMethod<[], Array<Project>>,
  'saveAIRecommendation' : ActorMethod<[bigint, string], undefined>,
  'updateProject' : ActorMethod<
    [
      bigint,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      Array<string>,
    ],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
