const fs = require("fs");
const parse = require("csv-parse");

const input = fs.readFileSync("./stocks.csv");
const columns = [
	"wkn",
	"name",
	"isin",
	"währung",
	"kategorie",
	"land",
	"branche",
	"verstecktFürMunioSuche",
	"wertpapiertyp",
	"zinsmethode",
	"nennwert",
	"Ausschüttend",
	"rankingAlsZertifikateAmpel",
	"AnleihenformelnFürRenditeVerwenden",
	"anzahlKurse",
	"KursverlängerungDurchPeergroupDeaktiviert",
	"neuberechnungDerPeerGroupDeaktiviert",
	"berechneteRendite",
	"berechnetesRisiko",
	"eingestellteRendite",
	"eingestelltesRisiko",
	"eingestellteRenditeNichtDurchUpdatesÜberschreiben",
	"eingestelltesRisikoNichtDurchUpdatesÜberschreiben",
	"DserGeprüftBisDatum",
	"dserGeprüft",
	"FreigegebenFürHausmeinungenBis",
	"freigegebenFürHausmeinungen",
	"anz kupon zahlungspunkte/jahr",
	"kupon",
	"letzterKupontermin",
	"emissionsdatum",
	"laufzeit",
	"ersterKupontermin"
];

parse(input, {delimiter: ";"}, function (err, output) {
	const result = [];
	for (var i = 0; i < output.length; i += 2) {
		const row0 = output[i];
		const row1 = output[i + 1];
		const data = [];
		row1.forEach(function (t, i) {
			data.push(row0[i], row1[i]);
		});

		const row = {};
		data.forEach(function (t, i) {
			if (i === 0) {
				return;
			}
			const colName = columns[i - 1];
			row[colName] = t;
		});

		result.push(row);
	}

	fs.writeFileSync("./db.json", JSON.stringify({stocks: result}));
});