export const getPatientDataByOrderQuery = `
select 
t.tick_fecharecepcion,
t.tick_fechaprocesado,
tm.teme_descripcion,
concat(p.paci_nombres," ", p.paci_apellidos) as fullname,
p.paci_documento,
e.enti_nombre ,
ec.esci_descripcion,
p.paci_dominancia,
p.paci_fechanacimiento,
TIMESTAMPDIFF(YEAR, p.paci_fechanacimiento, t.tick_fecharecepcion) AS years,
TIMESTAMPDIFF(MONTH, p.paci_fechanacimiento, t.tick_fecharecepcion) % 12 AS months,
DATEDIFF(t.tick_fecharecepcion, 
             DATE_ADD(DATE_ADD(p.paci_fechanacimiento, INTERVAL TIMESTAMPDIFF(YEAR, p.paci_fechanacimiento, t.tick_fecharecepcion) YEAR), 
             INTERVAL TIMESTAMPDIFF(MONTH, p.paci_fechanacimiento, t.tick_fecharecepcion) % 12 MONTH)) AS days,
emple.empl_firma as firma_medico,
anotphoto.anot_foto as photo_paciente,
anotphoto.anot_edad as edad,
hf.anot_huella,
hf.anot_firma

from javap.ticket t 
inner join javap.tipoexamen_medico tm on t.teme_id = tm.teme_id 
inner join javaphc.pacientes p on p.paci_id  = tick_paciente 
left join javap.entidades e on p.paci_eps = e.enti_id 
left join javap.estadocivil ec on ec.esci_id = p.paci_ecivil
left join javap.empleados emple on emple.empl_id = t.empl_idmedico

left join javap.ticket_clienteservicio tcs on tcs.tick_id = t.tick_id

left join javaphc.anotaciones anotphoto on anotphoto.tics_id = tcs.tics_id and anotphoto.form_id =12
left join javaphc.anotaciones anotsignature on anotsignature.tics_id = tcs.tics_id and anotsignature.form_id =1
left join javaphc.huellafirma hf on hf.anot_id =  anotsignature.anot_id


where t.tick_id =  ?
`;
