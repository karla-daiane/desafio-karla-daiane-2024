class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();
        let recintosAdequados = {};
        let recintosViaveis = [];

        // Animais habilitados no zoológico
        const animaisHabilitados = {
            leao: {
                bioma: ["savana"],
                tamanho: 3,
                carnivoro: true
            },

            leopardo: {
                bioma: ["savana"],
                tamanho: 2,
                carnivoro: true
            },

            crocodilo: {
                bioma: ["rio"],
                tamanho: 3,
                carnivoro: true
            },

            macaco: {
                bioma: ["savana", "floresta"],
                tamanho : 1,
                carnivoro : false,
            },

            gazela : {
                bioma : ["savana"],
                tamanho : 2,
                carnivoro : false
            },

            hipopotamo : {
                bioma : ["savana", "rio"],
                tamanho : 4,
                carnivoro : false
            }
        }

        // Recintos do zoológico
        const recintosZoologico = {
            Recinto1 : {
                numero : 1,
                bioma : ["savana"],
                tamanhoTotal : 10,
                habitantes : {
                    macaco : 3
                }
            },

            Recinto2 : {
                numero : 2,
                bioma : ["floresta"],
                tamanhoTotal : 5,
                habitantes : {}
            },

            Recinto3 : {
                numero : 3,
                bioma : ["savana", "rio"],
                tamanhoTotal : 7,
                habitantes : {
                    gazela : 1
                }
            },

            Recinto4 : {
                numero : 4,
                bioma : ["rio"],
                tamanhoTotal : 8,
                habitantes : {}
            },

            Recinto5 : {
                numero : 5,
                bioma : ["savana"],
                tamanhoTotal : 9,
                habitantes : {
                    leao : 1
                }
            }
        }
        // Erro: Quantidade inválida
        if (quantidade <= 0) {
            return {
                erro : "Quantidade inválida"
            }
        }
        // Erro: Animal inválido
        if (animaisHabilitados.hasOwnProperty(animal) === false) {
            return {
                erro : "Animal inválido"
            }
        }

            
        // Adicionar recintos adequados
        let biomaAdequado = animaisHabilitados[animal].bioma;
        for (let recinto in recintosZoologico) {
            for (let biomaAnimal of biomaAdequado){
                if (recintosZoologico[recinto].bioma.includes(biomaAnimal)) {
                    recintosAdequados[recinto] = recintosZoologico[recinto];
                }
            }
        }

        // Remover recintos indisponíveis
        for (let recinto in recintosAdequados){
            let recintoIndisponivel = false;
            let espacosOcupados = 0;
            
            for (let habitante in recintosAdequados[recinto].habitantes){
                espacosOcupados += animaisHabilitados[habitante].tamanho * recintosAdequados[recinto].habitantes[habitante];
                if (habitante !== animal){
                    espacosOcupados++;
                }

                if (animaisHabilitados[habitante].carnivoro !== animaisHabilitados[animal].carnivoro){
                    recintoIndisponivel = true;
                }
            }

            espacosOcupados += animaisHabilitados[animal].tamanho * quantidade;
            recintosAdequados[recinto].espacoLivre = recintosZoologico[recinto].tamanhoTotal - espacosOcupados;
            
            if (recintosZoologico[recinto].tamanhoTotal < espacosOcupados) {
                recintoIndisponivel = true;
            }

            if (animal === "macaco" && quantidade === 1 && Object.keys(recintosAdequados[recinto].habitantes).length === 0) {
                recintoIndisponivel = true;
            }

            if (animal === "hipopotamo" && Object.keys(recintosAdequados[recinto].habitantes).length > 0) {
                for (let habitat of animaisHabilitados[animal].bioma) {
                    if (!recintosAdequados[recinto].bioma.includes(habitat)) {
                        recintoIndisponivel = true;
                    }
                }
            }

            if (recintoIndisponivel) {
                delete recintosAdequados[recinto];
            }
        }
        
        for (let recinto in recintosAdequados) {
            let numero = recintosAdequados[recinto].numero;
            let espacoLivre = recintosAdequados[recinto].espacoLivre;
            let espacoTotal = recintosAdequados[recinto].tamanhoTotal;
            recintosViaveis.push(`Recinto ${numero} (espaço livre: ${espacoLivre} total: ${espacoTotal})`);
        }

        // Return recintos viáveis ou inviáveis
        if (Object.keys(recintosAdequados).length > 0) {
            return {
                recintosViaveis
            };
        } else {
            return {
                erro: "Não há recinto viável"
            };
        }
    }

}

export { RecintosZoo as RecintosZoo };
