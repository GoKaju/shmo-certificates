import mysql from "mysql2/promise";
import constants from "../config";
import { getPatientDataByOrderQuery } from "./queries/get-patient-data";

export class MysqlService {
  async getPatientDataByOrder(orderId: string): Promise<PatientData> {
    const URI = constants().MYSQL_URI;
    const connection = await mysql.createConnection(URI);

    const [results] = await connection.query(getPatientDataByOrderQuery, [
      orderId,
    ]);

    const row = results[0] as any;

    if (!row) {
      throw new Error("No se encontraron datos para la orden indicada.");
    }

    return {
      admissionDate: row.tick_fecharecepcion,
      processedDate: row.tick_fechaprocesado,
      examType: row.teme_descripcion,
      patientName: row.fullname,
      patientDocument: row.paci_documento,
      entityName: row.enti_nombre,
      civilStatus: row.esci_descripcion,
      dominance: row.paci_dominancia,
      birthDate: row.paci_fechanacimiento,
      age: {
        years: row.years,
        months: row.months,
        days: row.days,
        full: `${row.years} años, ${row.months} meses y ${row.days} días`,
      },
      doctorSignature: row.firma_medico,
      patientPhoto: row.photo_paciente,
      fingerprint: row.anot_huella,
      signature: row.anot_firma,
    };
  }
}

export interface PatientData {
  admissionDate: string;
  processedDate: string;
  examType: string;
  patientName: string;
  patientDocument: string;
  entityName: string;
  civilStatus: string;
  dominance: string;
  birthDate: string;
  age: {
    years: number;
    months: number;
    days: number;
    full: string;
  };
  doctorSignature: string;
  patientPhoto: string;
  fingerprint: string;
  signature: string;
}
