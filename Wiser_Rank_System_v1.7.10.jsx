{
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "Wiser Rank System v1.7.10", undefined, { resizeable: true });

        var linksTexto = "";
        var rankingSelecionadoTexto = "20";
        var comecaNoQuartoTexto = false;

        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 10;
        win.margins = 15;

        var categoriaWrapper = win.add("group");
        categoriaWrapper.alignment = ["center", "top"];
        categoriaWrapper.alignChildren = ["center", "center"];

        var categoriaGroup = categoriaWrapper.add("group");
        categoriaGroup.orientation = "row";
        categoriaGroup.alignChildren = ["center", "center"];
        categoriaGroup.spacing = 8;

        var categoriaLabel = categoriaGroup.add("statictext", undefined, "Categoria:");
        categoriaLabel.preferredSize.width = 70;

        var categoriaInput = categoriaGroup.add("edittext", undefined, "");
        categoriaInput.characters = 30;

        var panel = win.add("panel", undefined, "Preencha com os nomes e descrições:");
        panel.orientation = "column";
        panel.alignChildren = ["left", "top"];
        panel.margins = [15, 28, 15, 15];
        panel.spacing = 6;

        var inputs = [];
        var posicoes = [
            "1º","2º","3º","4º","5º","6º","7º","8º","9º","10º",
            "11º","12º","13º","14º","15º","16º","17º","18º","19º","20º"
        ];

        for (var i = 0; i < 20; i++) {
            var group = panel.add("group");
            group.orientation = "row";
            group.alignChildren = ["left", "center"];
            group.spacing = 8;

            var labelPos = group.add("statictext", undefined, posicoes[i]);
            labelPos.preferredSize.width = 30;

            group.add("statictext", undefined, "nome:");
            var nome = group.add("edittext", undefined, "");
            nome.characters = 16;

            group.add("statictext", undefined, "tag:");
            var tag = group.add("edittext", undefined, "");
            tag.characters = 16;

            inputs.push({nome: nome, tag: tag});
        }

        function detectarExtensao(url) {
            var semQuery = url.split("?")[0].toLowerCase();
            if (semQuery.match(/\.png$/)) return ".png";
            if (semQuery.match(/\.jpeg$/)) return ".jpeg";
            if (semQuery.match(/\.jpg$/)) return ".jpg";
            if (semQuery.match(/\.psd$/)) return ".psd";
            if (semQuery.match(/\.webp$/)) return ".webp";
            return ".jpg";
        }

        
        function removerAcentosVisual(txt) {
            txt = String(txt);
            txt = txt.replace(/[ÁÀÂÃÄ]/g, "A").replace(/[áàâãä]/g, "a");
            txt = txt.replace(/[ÉÈÊË]/g, "E").replace(/[éèêë]/g, "e");
            txt = txt.replace(/[ÍÌÎÏ]/g, "I").replace(/[íìîï]/g, "i");
            txt = txt.replace(/[ÓÒÔÕÖ]/g, "O").replace(/[óòôõö]/g, "o");
            txt = txt.replace(/[ÚÙÛÜ]/g, "U").replace(/[úùûü]/g, "u");
            txt = txt.replace(/[Ç]/g, "C").replace(/[ç]/g, "c");
            return txt;
        }

function normalizarNomeBase(txt) {
            var n = String(txt).toLowerCase();
            n = n.replace(/[\u00BA\u00B0]/g, "º");
            n = n.replace(/[áàâã]/g, "a");
            n = n.replace(/[éèê]/g, "e");
            n = n.replace(/[íìî]/g, "i");
            n = n.replace(/[óòôõ]/g, "o");
            n = n.replace(/[úùû]/g, "u");
            n = n.replace(/ç/g, "c");
            n = n.replace(/\s+/g, " ");
            n = n.replace(/^\s+|\s+$/g, "");
            return n;
        }

        function getNomePadraoPosicao(pos) {
            var nomes = {
                1: "primeiro lugar",
                2: "segundo lugar",
                3: "terceiro lugar",
                4: "quarto lugar",
                5: "quinto lugar",
                6: "sexto lugar",
                7: "setimo lugar",
                8: "oitavo lugar",
                9: "nono lugar",
                10: "decimo lugar",
                11: "decimo primeiro lugar",
                12: "decimo segundo lugar",
                13: "decimo terceiro lugar",
                14: "decimo quarto lugar",
                15: "decimo quinto lugar",
                16: "decimo sexto lugar",
                17: "decimo setimo lugar",
                18: "decimo oitavo lugar",
                19: "decimo nono lugar",
                20: "vigesimo lugar"
            };
            return nomes[pos] || "";
        }

        function getOrdemNome(nome) {
            var n = normalizarNomeBase(nome);

            var mapa = {
                "primeiro lugar": 1,
                "primeiro lugar tag": 1,
                "segundo lugar": 2,
                "segundo lugar tag": 2,
                "terceiro lugar": 3,
                "terceiro lugar tag": 3,
                "quarto lugar": 4,
                "quarto lugar tag": 4,
                "quinto lugar": 5,
                "quinto lugar tag": 5,
                "sexto lugar": 6,
                "sexto lugar tag": 6,
                "setimo lugar": 7,
                "setimo lugar tag": 7,
                "oitavo lugar": 8,
                "oitavo lugar tag": 8,
                "nono lugar": 9,
                "nono lugar tag": 9,
                "decimo lugar": 10,
                "decimo lugar tag": 10,
                "decimo primeiro lugar": 11,
                "decimo primeiro lugar tag": 11,
                "decimo segundo lugar": 12,
                "decimo segundo lugar tag": 12,
                "decimo terceiro lugar": 13,
                "decimo terceiro lugar tag": 13,
                "decimo quarto lugar": 14,
                "decimo quarto lugar tag": 14,
                "decimo quinto lugar": 15,
                "decimo quinto lugar tag": 15,
                "decimo sexto lugar": 16,
                "decimo sexto lugar tag": 16,
                "decimo setimo lugar": 17,
                "decimo setimo lugar tag": 17,
                "decimo oitavo lugar": 18,
                "decimo oitavo lugar tag": 18,
                "decimo nono lugar": 19,
                "decimo nono lugar tag": 19,
                "vigesimo lugar": 20,
                "vigesimo lugar tag": 20
            };

            if (mapa[n] !== undefined) return mapa[n];

            var m;

            m = n.match(/^(\d{1,2})\s*[ºo]?\s*lugar(?:\s*tag)?$/);
            if (m) {
                var v1 = parseInt(m[1], 10);
                if (v1 >= 1 && v1 <= 20) return v1;
            }

            m = n.match(/^lugar\s*(\d{1,2})(?:\s*tag)?$/);
            if (m) {
                var v2 = parseInt(m[1], 10);
                if (v2 >= 1 && v2 <= 20) return v2;
            }

            m = n.match(/(\d{1,2})/);
            if (m) {
                var v3 = parseInt(m[1], 10);
                if (v3 >= 1 && v3 <= 20) return v3;
            }

            return 9999;
        }

        function getNumeroFoto(nome) {
            var m = nome.match(/(\d+)/);
            return m ? parseInt(m[1], 10) : 9999;
        }

        function removeLayerIfExists(comp, layerName) {
            for (var i = comp.numLayers; i >= 1; i--) {
                if (comp.layer(i).name === layerName) {
                    comp.layer(i).remove();
                }
            }
        }

        function createEllipseShape(comp, layerName, diameter, strokeWidth, hasFill, hasStroke) {
            var shapeLayer = comp.layers.addShape();
            shapeLayer.name = layerName;

            var contents = shapeLayer.property("Contents");
            var ellipseGroup = contents.addProperty("ADBE Vector Group");
            ellipseGroup.name = layerName;

            var ellipseContents = ellipseGroup.property("Contents");

            var ellipse = ellipseContents.addProperty("ADBE Vector Shape - Ellipse");
            ellipse.property("Size").setValue([diameter, diameter]);

            if (hasFill) {
                var fill = ellipseContents.addProperty("ADBE Vector Graphic - Fill");
                fill.property("Color").setValue([1, 1, 1]);
                fill.property("Opacity").setValue(100);
            }

            if (hasStroke) {
                var stroke = ellipseContents.addProperty("ADBE Vector Graphic - Stroke");
                stroke.property("Color").setValue([1, 1, 1]);
                stroke.property("Opacity").setValue(100);
                stroke.property("Stroke Width").setValue(strokeWidth);
            }

            var transform = ellipseGroup.property("Transform");
            transform.property("Position").setValue([0, 0]);

            shapeLayer.property("Transform").property("Position").setValue([comp.width / 2, comp.height / 2]);

            return shapeLayer;
        }

        function setTrackMatteSafe(fotoLayer) {
            try {
                fotoLayer.trackMatteType = TrackMatteType.ALPHA;
            } catch (e) {
                try {
                    fotoLayer.trackMatteType = TrackMatteType.ALPHA_INVERTED;
                    fotoLayer.trackMatteType = TrackMatteType.ALPHA;
                } catch (err) {}
            }
        }

        function montarCompFoto(comp, footage) {
            removeLayerIfExists(comp, "CONTORNO FOTO");
            removeLayerIfExists(comp, "MASCARA FOTO");

            while (comp.numLayers > 0) {
                comp.layer(1).remove();
            }

            var fotoLayer = comp.layers.add(footage);
            fotoLayer.name = footage.name;

            var scaleX = (comp.width / footage.width) * 100;
            var scaleY = (comp.height / footage.height) * 100;
            var scale = Math.max(scaleX, scaleY);

            fotoLayer.property("Scale").setValue([scale, scale]);
            fotoLayer.property("Position").setValue([comp.width / 2, comp.height / 2]);

            var diameter = Math.min(comp.width, comp.height) * 0.78;

            var mascara = createEllipseShape(comp, "MASCARA FOTO", diameter, 0, true, false);
            var contorno = createEllipseShape(comp, "CONTORNO FOTO", diameter, 8, false, true);

            mascara.moveBefore(fotoLayer);
            contorno.moveToBeginning();

            setTrackMatteSafe(fotoLayer);

            try {
                fotoLayer.selected = true;
            } catch (e) {}
        }

        function importarFotosDaPasta(pasta) {
            app.beginUndoGroup("Importar Fotos");

            var arquivos = pasta.getFiles(function(f) {
                return f instanceof File && f.name.match(/\.(jpg|jpeg|png|psd|webp)$/i);
            });

            if (arquivos.length === 0) {
                app.endUndoGroup();
                alert("Nenhuma imagem encontrada!");
                return;
            }

            arquivos.sort(function(a, b) {
                return getNumeroFoto(a.name) - getNumeroFoto(b.name);
            });

            var resourcesFolder = null;
            var fotosFolder = null;

            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof FolderItem && item.name === "RESOURCES") {
                    resourcesFolder = item;
                    break;
                }
            }

            if (!resourcesFolder) {
                resourcesFolder = app.project.items.addFolder("RESOURCES");
            }

            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof FolderItem && item.name === "FOTOS" && item.parentFolder === resourcesFolder) {
                    fotosFolder = item;
                    break;
                }
            }

            if (!fotosFolder) {
                fotosFolder = app.project.items.addFolder("FOTOS");
                fotosFolder.parentFolder = resourcesFolder;
            }

            var compPorNumero = {};

            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem) {
                    var nomeComp = normalizarNomeBase(item.name);
                    if (/^foto\s*\d+$/i.test(nomeComp)) {
                        var numeroComp = getNumeroFoto(item.name);
                        if (numeroComp >= 1 && numeroComp <= 20) {
                            compPorNumero[numeroComp] = item;
                        }
                    }
                }
            }

            var importadas = 0;
            var ignoradas = [];

            for (var a = 0; a < arquivos.length; a++) {
                var numeroFoto = getNumeroFoto(arquivos[a].name);

                if (numeroFoto < 1 || numeroFoto > 20) {
                    ignoradas.push(arquivos[a].name + " (número fora de 01 a 20)");
                    continue;
                }

                var compDestino = compPorNumero[numeroFoto];

                if (!compDestino) {
                    ignoradas.push(arquivos[a].name + " (comp foto " + pad2(numeroFoto) + " não encontrada)");
                    continue;
                }

                var importOptions = new ImportOptions(arquivos[a]);
                var footage = app.project.importFile(importOptions);

                footage.name = "foto " + pad2(numeroFoto);
                footage.parentFolder = fotosFolder;

                montarCompFoto(compDestino, footage);
                importadas++;
            }

            app.endUndoGroup();

            var msg = "Fotos importadas com sucesso: " + importadas + ".";
            if (ignoradas.length > 0) {
                msg += "\n\nArquivos ignorados:\n- " + ignoradas.join("\n- ");
            }
            alert(msg);
        }

        function escaparPS(txt) {
            return String(txt).replace(/'/g, "''");
        }

        function escaparBAT(txt) {
            return String(txt).replace(/"/g, '""');
        }

        function baixarFotosDosLinks(textoLinks, rankingTop, comecaNoQuarto) {
            rankingTop = String(rankingTop);
            comecaNoQuarto = !!comecaNoQuarto;

            var fotoInicial = comecaNoQuarto ? 4 : 1;
            var fotoFinal = 20;
            var nomeModo = "Top 20";

            if (rankingTop === "20") {
                fotoFinal = 20;
                nomeModo = "Top 20";
            } else if (rankingTop === "11") {
                fotoFinal = 11;
                nomeModo = "Top 11";
            } else if (rankingTop === "10") {
                fotoFinal = 10;
                nomeModo = "Top 10";
            } else {
                alert("Selecione qual ranking será usado: Top 20, Top 11 ou Top 10.");
                return false;
            }

            if (fotoInicial > fotoFinal) {
                alert("Configuração inválida. A foto inicial não pode ser maior que a foto final.");
                return false;
            }

            if (comecaNoQuarto) {
                nomeModo += " a partir do 4º lugar";
            }

            var maxLinks = (fotoFinal - fotoInicial) + 1;

            var pasta = Folder.selectDialog("Selecione a pasta onde salvar as fotos");
            if (!pasta) return false;

            var texto = textoLinks.replace(/\r/g, "");
            var linhas = texto.split("\n");
            var links = [];

            for (var i = 0; i < linhas.length; i++) {
                var linha = linhas[i].replace(/^\s+|\s+$/g, "");
                if (linha !== "") {
                    links.push(linha);
                }
            }

            if (links.length === 0) {
                alert("Nenhum link foi informado.");
                return false;
            }

            if (links.length > maxLinks) {
                alert(nomeModo + " selecionado. Apenas os " + maxLinks + " primeiros links serão usados.");
            }

            var total = Math.min(maxLinks, links.length);

            var arquivoPS = new File(Folder.temp.fsName + "/wiser_download_fotos.ps1");
            arquivoPS.encoding = "UTF-8";
            if (!arquivoPS.open("w")) {
                alert("Não foi possível criar o arquivo temporário de PowerShell.");
                return false;
            }

            var ps = [];
            ps.push("$ErrorActionPreference = 'Continue'");
            ps.push("$ProgressPreference = 'Continue'");
            ps.push("");
            ps.push("$destino = '" + escaparPS(pasta.fsName) + "'");
            ps.push("if (!(Test-Path $destino)) { New-Item -ItemType Directory -Path $destino | Out-Null }");
            ps.push("");
            ps.push("Write-Host ''");
            ps.push("Write-Host '=== DOWNLOAD DAS FOTOS ===' -ForegroundColor Cyan");
            ps.push("Write-Host 'Modo: " + escaparPS(nomeModo) + "'");
            ps.push("Write-Host 'Pasta de destino: ' $destino");
            ps.push("Write-Host ''");

            for (var j = 0; j < total; j++) {
                var url = links[j];
                var ext = detectarExtensao(url);
                var numeroFoto = fotoInicial + j;
                var nomeArquivo = "foto_" + ("0" + numeroFoto).slice(-2) + ext;

                ps.push("$url = '" + escaparPS(url) + "'");
                ps.push("$saida = Join-Path $destino '" + escaparPS(nomeArquivo) + "'");
                ps.push("Write-Host 'Baixando " + (j + 1) + "/" + total + ": " + nomeArquivo + "' -ForegroundColor Yellow");
                ps.push("try {");
                ps.push("    Invoke-WebRequest -Uri $url -OutFile $saida -UseBasicParsing");
                ps.push("    if ((Test-Path $saida) -and ((Get-Item $saida).Length -gt 0)) {");
                ps.push("        Write-Host 'OK -> ' $saida -ForegroundColor Green");
                ps.push("    } else {");
                ps.push("        Write-Host 'Falha: arquivo vazio -> ' $url -ForegroundColor Red");
                ps.push("    }");
                ps.push("} catch {");
                ps.push("    Write-Host 'Erro ao baixar: ' $url -ForegroundColor Red");
                ps.push("    Write-Host $_.Exception.Message -ForegroundColor DarkRed");
                ps.push("}");
                ps.push("Write-Host ''");
            }

            ps.push("Write-Host 'Downloads finalizados.' -ForegroundColor Cyan");
            ps.push("Start-Sleep -Seconds 1");

            arquivoPS.write(ps.join("\r\n"));
            arquivoPS.close();

            var arquivoBAT = new File(Folder.temp.fsName + "/wiser_download_fotos.bat");
            arquivoBAT.encoding = "UTF-8";
            if (!arquivoBAT.open("w")) {
                alert("Não foi possível criar o arquivo temporário BAT.");
                return false;
            }

            var bat = [];
            bat.push("@echo off");
            bat.push('powershell.exe -ExecutionPolicy Bypass -File "' + escaparBAT(arquivoPS.fsName) + '"');
            bat.push("exit");

            arquivoBAT.write(bat.join("\r\n"));
            arquivoBAT.close();

            var ok = arquivoBAT.execute();
            if (!ok) {
                alert("Não foi possível iniciar o processo de download.");
                return false;
            }

            return true;
        }

        function pad2(n) {
            return ("0" + n).slice(-2);
        }

        function randomCode(len) {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var out = "";
            for (var i = 0; i < len; i++) {
                out += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return out;
        }

        function commentJaExiste(valor) {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem && item.comment === valor) {
                    return true;
                }
            }
            return false;
        }

        function gerarCommentUnico(prefixo, indice) {
            var tentativa = "";
            do {
                tentativa = prefixo + "_" + pad2(indice) + "_" + randomCode(6);
            } while (commentJaExiste(tentativa));
            return tentativa;
        }

        function limparCommentsIDsAntigos() {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (!(item instanceof CompItem)) continue;

                if (!item.comment) continue;

                if (
                    item.comment.indexOf("NAME_") === 0 ||
                    item.comment.indexOf("TAG_") === 0 ||
                    item.comment.indexOf("CAT_") === 0
                ) {
                    item.comment = "";
                }
            }
        }

        function findCompByCommentPrefix(prefixo, indice) {
            var alvo = prefixo + "_" + pad2(indice) + "_";
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (!(item instanceof CompItem)) continue;
                if (item.comment && item.comment.indexOf(alvo) === 0) {
                    return item;
                }
            }
            return null;
        }

        function findCategoriaByComment() {
            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (!(item instanceof CompItem)) continue;
                if (item.comment && item.comment.indexOf("CAT_00_") === 0) {
                    return item;
                }
            }
            return null;
        }

        function coletarCompsPorPasta() {
            var mapa = {};
            var categoriaComp = null;
            var grupos = {};

            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (!(item instanceof CompItem)) continue;

                var nomeComp = normalizarNomeBase(item.name);
                if (/^foto\s*\d+$/i.test(nomeComp)) continue;

                var pastaPai = item.parentFolder ? normalizarNomeBase(item.parentFolder.name) : "";

                if (pastaPai === "categoria" || nomeComp === "categoria") {
                    categoriaComp = item;
                    continue;
                }

                var pos = getOrdemNome(pastaPai);
                if (pos === 9999 || pos < 1 || pos > 20) continue;

                if (!grupos[pos]) grupos[pos] = [];
                grupos[pos].push(item);
            }

            for (var pos = 1; pos <= 20; pos++) {
                mapa[pos] = { name: null, tag: null };

                var comps = grupos[pos];
                if (!comps || comps.length === 0) continue;

                var nomePadrao = getNomePadraoPosicao(pos);

                for (var c = 0; c < comps.length; c++) {
                    var comp = comps[c];
                    var nomeCompNorm = normalizarNomeBase(comp.name);

                    if (nomeCompNorm === nomePadrao) {
                        mapa[pos].name = comp;
                        break;
                    }
                }

                for (var c2 = 0; c2 < comps.length; c2++) {
                    var comp2 = comps[c2];
                    if (comp2 !== mapa[pos].name) {
                        mapa[pos].tag = comp2;
                        break;
                    }
                }

                if (!mapa[pos].name && comps.length >= 1) {
                    mapa[pos].name = comps[0];
                }

                if (!mapa[pos].tag && comps.length >= 2) {
                    for (var c3 = 0; c3 < comps.length; c3++) {
                        if (comps[c3] !== mapa[pos].name) {
                            mapa[pos].tag = comps[c3];
                            break;
                        }
                    }
                }
            }

            return {
                mapa: mapa,
                categoria: categoriaComp
            };
        }



function aplicarIDsPorPasta() {
    app.beginUndoGroup("Criar IDs Aleatórias");
    limparCommentsIDsAntigos();

    var dados = coletarCompsPorPasta();
    var mapa = dados.mapa;
    var criadas = 0;

    for (var i = 1; i <= 20; i++) {
        var grupo = mapa[i];

        if (grupo && grupo.name) {
            grupo.name.comment = gerarCommentUnico("NAME", i);
            criadas++;
        }

        if (grupo && grupo.tag) {
            grupo.tag.comment = gerarCommentUnico("TAG", i);
            criadas++;
        }
    }

    if (dados.categoria) {
        dados.categoria.comment = gerarCommentUnico("CAT", 0);
    }

    app.endUndoGroup();
    alert("IDs recriadas corretamente por pasta.\nTotal de IDs criadas: " + criadas);
}

        function aplicarTimingPushExtra() {
            var comp = app.project.activeItem;

            if (!(comp instanceof CompItem)) {
                alert("Abra uma composição primeiro.");
                return;
            }

            var selected = comp.selectedLayers;

            if (selected.length !== 1) {
                alert("Selecione pelo menos uma layer.");
                return;
            }

            var baseLayer = selected[0];
            var incremento = 1; // segundos

            app.beginUndoGroup("Aumentar layer e empurrar acima");

            // 1. Aumenta apenas a layer selecionada em +1s
            baseLayer.outPoint += incremento;

            // 2. Tudo que está acima dela na timeline vai +1s para a direita
            for (var i = 1; i < baseLayer.index; i++) {
                var layerAcima = comp.layer(i);
                layerAcima.startTime += incremento;
            }

            app.endUndoGroup();
        }


        function getWiserMeta(layer, chave) {
            var c = layer.comment || "";
            var re = new RegExp("\\[WISER_" + chave + ":([^\\]]+)\\]");
            var m = c.match(re);
            return m ? m[1] : null;
        }

        function setWiserMeta(layer, chave, valor) {
            var c = layer.comment || "";
            var re = new RegExp("\\[WISER_" + chave + ":[^\\]]+\\]", "g");
            c = c.replace(re, "");
            if (c !== "" && c.charAt(c.length - 1) !== " ") c += " ";
            layer.comment = c + "[WISER_" + chave + ":" + valor + "]";
        }

        function removeWiserMeta(layer, chave) {
            var c = layer.comment || "";
            var re = new RegExp("\\s*\\[WISER_" + chave + ":[^\\]]+\\]", "g");
            layer.comment = c.replace(re, "");
        }

        function encontrarLayersNomeTag(comp) {
            var dados = {
                nomeLayer: null,
                tagLayer: null
            };

            for (var i = 1; i <= comp.numLayers; i++) {
                var layer = comp.layer(i);

                if (!(layer instanceof TextLayer)) continue;

                var nomeLayerNormalizado = normalizarNomeBase(layer.name);

                if (nomeLayerNormalizado === "tag") {
                    dados.tagLayer = layer;
                }

                if (nomeLayerNormalizado === "nome") {
                    dados.nomeLayer = layer;
                }
            }

            return dados;
        }

        function varrerCompsDaRaiz(rootComp, callback) {
            var compsVisitadas = {};

            function varrer(comp) {
                if (!comp || !(comp instanceof CompItem)) return;

                var id = String(comp.id);
                if (compsVisitadas[id]) return;
                compsVisitadas[id] = true;

                callback(comp);

                for (var i = 1; i <= comp.numLayers; i++) {
                    var layer = comp.layer(i);

                    if (layer.source && layer.source instanceof CompItem) {
                        varrer(layer.source);
                    }
                }
            }

            varrer(rootComp);
        }

        function ocultarTagsECentralizarNomesNaRaiz() {
            var rootComp = app.project.activeItem;

            if (!(rootComp instanceof CompItem)) {
                alert("Abra ou selecione a composição raiz primeiro.");
                return;
            }

            app.beginUndoGroup("Ocultar Tags e Centralizar Nomes");

            var compsProcessadas = 0;
            var tagsOcultadas = 0;
            var nomesCentralizados = 0;

            varrerCompsDaRaiz(rootComp, function (comp) {
                var dados = encontrarLayersNomeTag(comp);
                var nomeLayer = dados.nomeLayer;
                var tagLayer = dados.tagLayer;

                if (nomeLayer && tagLayer) {
                    var posOriginal = nomeLayer.property("Position").value;

                    if (!getWiserMeta(nomeLayer, "NOME_POS")) {
                        setWiserMeta(nomeLayer, "NOME_POS", posOriginal[0] + "," + posOriginal[1]);
                    }

                    if (!getWiserMeta(tagLayer, "TAG_ENABLED")) {
                        setWiserMeta(tagLayer, "TAG_ENABLED", tagLayer.enabled ? "1" : "0");
                    }

                    tagLayer.enabled = false;
                    tagsOcultadas++;

                    var posTag = tagLayer.property("Position").value;

                    // Mantém o X original para não deslocar textos para fora da caixa.
                    var novoX = posOriginal[0];

                    // Centralização vertical segura:
                    // usa o espaço original entre NOME e TAG, não o centro da comp.
                    // Isso evita quebrar layouts específicos, como o 20º lugar.
                    var ajusteVisualY = -18;
                    var novoY = ((posOriginal[1] + posTag[1]) / 2) + ajusteVisualY;

                    nomeLayer.property("Position").setValue([novoX, novoY]);

                    nomesCentralizados++;
                    compsProcessadas++;
                }
            });

            app.endUndoGroup();

            alert(
                "Modo sem tags aplicado.\n\n" +
                "Composições processadas: " + compsProcessadas + "\n" +
                "Tags ocultadas: " + tagsOcultadas + "\n" +
                "Nomes centralizados: " + nomesCentralizados
            );
        }

        function restaurarTagsEPosicaoNaRaiz() {
            var rootComp = app.project.activeItem;

            if (!(rootComp instanceof CompItem)) {
                alert("Abra ou selecione a composição raiz primeiro.");
                return;
            }

            app.beginUndoGroup("Restaurar Tags e Posição dos Nomes");

            var compsProcessadas = 0;
            var tagsRestauradas = 0;
            var posicoesRestauradas = 0;

            varrerCompsDaRaiz(rootComp, function (comp) {
                var dados = encontrarLayersNomeTag(comp);
                var nomeLayer = dados.nomeLayer;
                var tagLayer = dados.tagLayer;
                var alterou = false;

                if (tagLayer) {
                    var tagEnabledOriginal = getWiserMeta(tagLayer, "TAG_ENABLED");

                    if (tagEnabledOriginal !== null) {
                        tagLayer.enabled = (tagEnabledOriginal === "1");
                        removeWiserMeta(tagLayer, "TAG_ENABLED");
                    } else {
                        tagLayer.enabled = true;
                    }

                    tagsRestauradas++;
                    alterou = true;
                }

                if (nomeLayer) {
                    var posOriginal = getWiserMeta(nomeLayer, "NOME_POS");

                    if (posOriginal !== null) {
                        var partes = posOriginal.split(",");
                        if (partes.length === 2) {
                            var x = parseFloat(partes[0]);
                            var y = parseFloat(partes[1]);

                            if (!isNaN(x) && !isNaN(y)) {
                                nomeLayer.property("Position").setValue([x, y]);
                                posicoesRestauradas++;
                                alterou = true;
                            }
                        }

                        removeWiserMeta(nomeLayer, "NOME_POS");
                    }
                }

                if (alterou) compsProcessadas++;
            });

            app.endUndoGroup();

            alert(
                "Tags restauradas.\n\n" +
                "Composições processadas: " + compsProcessadas + "\n" +
                "Tags restauradas: " + tagsRestauradas + "\n" +
                "Posições restauradas: " + posicoesRestauradas
            );
        }

        function reduzirTamanhoNomesNaRaiz() {
            var rootComp = app.project.activeItem;

            if (!(rootComp instanceof CompItem)) {
                alert("Abra ou selecione a composição raiz primeiro.");
                return;
            }

            app.beginUndoGroup("Diminuir Tamanho do Texto");

            var nomesAjustados = 0;
            var nomesIgnorados = 0;

            varrerCompsDaRaiz(rootComp, function (comp) {
                var dados = encontrarLayersNomeTag(comp);
                var nomeLayer = dados.nomeLayer;

                if (nomeLayer) {
                    var textProp = nomeLayer.property("Source Text");
                    var doc = textProp.value;

                    var fontSizeOriginal = getWiserMeta(nomeLayer, "NOME_FONTSIZE_ORIGINAL");
                    var jaReduzido = getWiserMeta(nomeLayer, "NOME_REDUZIDO_90");

                    // Se já foi reduzido por este botão, não reduz novamente.
                    if (jaReduzido === "1") {
                        nomesIgnorados++;
                        return;
                    }

                    // Salva o tamanho original antes da primeira redução.
                    if (fontSizeOriginal === null) {
                        fontSizeOriginal = String(doc.fontSize);
                        setWiserMeta(nomeLayer, "NOME_FONTSIZE_ORIGINAL", fontSizeOriginal);
                    }

                    var tamanhoBase = parseFloat(fontSizeOriginal);

                    if (isNaN(tamanhoBase) || tamanhoBase <= 0) {
                        tamanhoBase = doc.fontSize;
                    }

                    doc.fontSize = tamanhoBase * 0.90;
                    textProp.setValue(doc);

                    setWiserMeta(nomeLayer, "NOME_REDUZIDO_90", "1");

                    nomesAjustados++;
                }
            });

            app.endUndoGroup();

            alert(
                "Texto reduzido para 90% do tamanho original.\n\n" +
                "Nomes ajustados: " + nomesAjustados + "\n" +
                "Nomes que já estavam em 90%: " + nomesIgnorados
            );
        }

        function prepararDadosImportacao(content) {
            content = content.replace(/\r/g, "");
            var linhas = content.split("\n");
            var separador = "\t";
            var i;
            var linhaTeste = "";

            for (i = 0; i < linhas.length; i++) {
                if (linhas[i].replace(/\s/g, "") !== "") {
                    linhaTeste = linhas[i];
                    break;
                }
            }

            if (linhaTeste.indexOf("\t") !== -1) separador = "\t";
            else if (linhaTeste.indexOf(";") !== -1) separador = ";";
            else if (linhaTeste.indexOf(",") !== -1) separador = ",";

            function clean(v) {
                if (!v) return "";
                return v.replace(/^"|"$/g, "").replace(/^\s+|\s+$/g, "");
            }

            var rows = [];
            var count = 0;

            for (i = 0; i < linhas.length && count < 20; i++) {
                if (linhas[i].replace(/\s/g, "") === "") continue;

                var partes = linhas[i].split(separador);
                rows.push({
                    linha: count + 1,
                    nome: clean(partes[0]),
                    tag: clean(partes[1])
                });
                count++;
            }

            return rows;
        }

        function mostrarEditorImportacao(rows) {
            var previewWin = new Window("dialog", "Revisar CSV / TSV");
            previewWin.orientation = "column";
            previewWin.alignChildren = ["fill", "top"];
            previewWin.spacing = 10;
            previewWin.margins = 15;

            var info = previewWin.add("statictext", undefined, "Edite os dados abaixo antes de importar:");
            info.alignment = ["left", "top"];

            var listPanel = previewWin.add("panel", undefined, "");
            listPanel.orientation = "column";
            listPanel.alignChildren = ["fill", "top"];
            listPanel.margins = [10, 10, 10, 10];
            listPanel.spacing = 4;

            var container = listPanel.add("group");
            container.orientation = "column";
            container.alignChildren = ["fill", "top"];
            container.spacing = 4;

            var editRows = [];

            for (var i = 0; i < 20; i++) {
                var row = container.add("group");
                row.orientation = "row";
                row.alignChildren = ["left", "center"];
                row.spacing = 10;

                var lbl = row.add("statictext", undefined, pad2(i + 1));
                lbl.preferredSize.width = 32;

                var nome = row.add("edittext", undefined, rows[i] ? rows[i].nome : "");
                nome.preferredSize.width = 250;

                var tag = row.add("edittext", undefined, rows[i] ? rows[i].tag : "");
                tag.preferredSize.width = 220;

                editRows.push({
                    nome: nome,
                    tag: tag
                });
            }

            var info2 = previewWin.add("statictext", undefined, "Você pode ajustar qualquer linha antes de confirmar.");
            info2.alignment = ["left", "top"];

            var btnGroup = previewWin.add("group");
            btnGroup.orientation = "row";
            btnGroup.alignment = ["right", "top"];

            var cancelarBtn = btnGroup.add("button", undefined, "Cancelar", {name: "cancel"});
            var confirmarBtn = btnGroup.add("button", undefined, "Confirmar Importação", {name: "ok"});

            var resultado = null;

            confirmarBtn.onClick = function () {
                resultado = [];
                for (var i = 0; i < editRows.length; i++) {
                    resultado.push({
                        linha: i + 1,
                        nome: editRows[i].nome.text,
                        tag: editRows[i].tag.text
                    });
                }
                previewWin.close();
            };

            cancelarBtn.onClick = function () {
                previewWin.close();
            };

            previewWin.center();
            previewWin.show();

            return resultado;
        }

        function deixarBotaoVermelho(btn) {
            btn.graphics.font = ScriptUI.newFont("Arial", "BOLD", 13);
            btn.onDraw = function () {
                var g = this.graphics;
                var w = this.size[0];
                var h = this.size[1];

                var bg = g.newBrush(g.BrushType.SOLID_COLOR, [0.85, 0.05, 0.05, 1]);
                var txt = g.newPen(g.PenType.SOLID_COLOR, [1, 1, 1, 1], 1);
                var border = g.newPen(g.PenType.SOLID_COLOR, [0.45, 0, 0, 1], 1);

                g.rectPath(0, 0, w, h);
                g.fillPath(bg);
                g.strokePath(border);

                var texto = this.text;
                var medida = g.measureString(texto, this.graphics.font);
                var x = Math.max(0, (w - medida[0]) / 2);
                var y = Math.max(0, (h - medida[1]) / 2);

                g.drawString(texto, txt, x, y);
            };
        }

        var applyBtn = win.add("button", undefined, "Aplicar");
        applyBtn.alignment = ["fill", "top"];
        applyBtn.preferredSize.height = 40;

        var aplicarIdsBtn = win.add("button", undefined, "Aplicar IDs");
        aplicarIdsBtn.alignment = ["fill", "top"];
        aplicarIdsBtn.preferredSize.height = 34;
        aplicarIdsBtn.onClick = function () {
            aplicarIDsPorPasta();
        };

        applyBtn.onClick = function () {
            app.beginUndoGroup("Renomear Ranking");

            var fallback = coletarCompsPorPasta();
            var itensParaRenomear = [];

            function adicionarRenomeacao(comp, finalName) {
                if (!comp) return;
                if (finalName === "") return;

                for (var i = 0; i < itensParaRenomear.length; i++) {
                    if (itensParaRenomear[i].item === comp) return;
                }

                itensParaRenomear.push({
                    item: comp,
                    finalName: finalName
                });
            }

            for (var i = 1; i <= 20; i++) {
                var compNome = findCompByCommentPrefix("NAME", i);
                var compTag = findCompByCommentPrefix("TAG", i);

                if (!compNome) compNome = fallback.mapa[i].name;
                if (!compTag) compTag = fallback.mapa[i].tag;

                adicionarRenomeacao(compNome, inputs[i - 1].nome.text);
                adicionarRenomeacao(compTag, inputs[i - 1].tag.text);
            }

            var categoriaComp = findCategoriaByComment();
            if (!categoriaComp) categoriaComp = fallback.categoria;

            if (categoriaComp && categoriaInput.text !== "") {
                adicionarRenomeacao(categoriaComp, categoriaInput.text);
            }

            for (var t = 0; t < itensParaRenomear.length; t++) {
                itensParaRenomear[t].item.name = "__temp__" + t + "__";
            }

            for (var r = 0; r < itensParaRenomear.length; r++) {
                itensParaRenomear[r].item.name = itensParaRenomear[r].finalName;
            }

            app.endUndoGroup();
            alert("Renomeação concluída!");
        };

        var extrasWindow = null;

        function criarJanelaExtras() {
            var extrasWin = new Window("palette", "Ferramentas Extras - Wiser Rank System", undefined, { resizeable: true });
            extrasWin.orientation = "column";
            extrasWin.alignChildren = ["fill", "top"];
            extrasWin.spacing = 10;
            extrasWin.margins = 15;

            var idsPanel = extrasWin.add("panel", undefined, "Dados");
            idsPanel.orientation = "column";
            idsPanel.alignChildren = ["fill", "top"];
            idsPanel.margins = [12, 22, 12, 12];
            idsPanel.spacing = 8;

            var importBtn = idsPanel.add("button", undefined, "Importar (CSV / TSV)");
            importBtn.preferredSize.height = 28;

            importBtn.onClick = function () {
                var file = File.openDialog("Selecione CSV ou TSV");
                if (!file) return;

                file.open("r");
                var content = file.read();
                file.close();

                var rows = prepararDadosImportacao(content);

                if (rows.length === 0) {
                    alert("Nenhum dado válido foi encontrado no arquivo.");
                    return;
                }

                var revisado = mostrarEditorImportacao(rows);
                if (!revisado) return;

                for (var i = 0; i < 20; i++) {
                    inputs[i].nome.text = "";
                    inputs[i].tag.text = "";
                }

                for (var j = 0; j < revisado.length && j < 20; j++) {
                    inputs[j].nome.text = revisado[j].nome;
                    inputs[j].tag.text = revisado[j].tag;
                }

                win.update();
                alert("Importação concluída!");
            };

            var fotosPanel = extrasWin.add("panel", undefined, "Fotos");
            fotosPanel.orientation = "column";
            fotosPanel.alignChildren = ["fill", "top"];
            fotosPanel.margins = [12, 22, 12, 12];
            fotosPanel.spacing = 8;

            var abrirLinksBtn = fotosPanel.add("button", undefined, "Links das Fotos");
            abrirLinksBtn.preferredSize.height = 28;

            abrirLinksBtn.onClick = function () {
                var linksWin = new Window("palette", "Links das Fotos", undefined, { resizeable: true });
                linksWin.orientation = "column";
                linksWin.alignChildren = ["fill", "top"];
                linksWin.spacing = 10;
                linksWin.margins = 15;

                var rankingPanel = linksWin.add("panel", undefined, "Qual ranking é?");
                rankingPanel.orientation = "column";
                rankingPanel.alignChildren = ["fill", "top"];
                rankingPanel.margins = [12, 18, 12, 12];
                rankingPanel.spacing = 8;

                var topGroup = rankingPanel.add("group");
                topGroup.orientation = "row";
                topGroup.alignChildren = ["left", "center"];
                topGroup.spacing = 18;

                var top20Radio = topGroup.add("radiobutton", undefined, "Top 20");
                var top11Radio = topGroup.add("radiobutton", undefined, "Top 11");
                var top10Radio = topGroup.add("radiobutton", undefined, "Top 10");

                var comecaNoQuartoCheck = rankingPanel.add("checkbox", undefined, "Começar no 4º lugar / ocultar 1º, 2º e 3º");
                comecaNoQuartoCheck.value = comecaNoQuartoTexto;

                if (rankingSelecionadoTexto === "10") {
                    top10Radio.value = true;
                } else if (rankingSelecionadoTexto === "11") {
                    top11Radio.value = true;
                } else {
                    top20Radio.value = true;
                }

                linksWin.add("statictext", undefined, "Cole os links, um por linha. O primeiro link será salvo automaticamente de acordo com a seleção acima:");

                var linksInputModal = linksWin.add("edittext", undefined, linksTexto, {
                    multiline: true,
                    scrolling: true
                });
                linksInputModal.preferredSize = [520, 260];
                linksInputModal.alignment = ["fill", "fill"];

                var btnGroup = linksWin.add("group");
                btnGroup.orientation = "row";
                btnGroup.alignment = ["fill", "bottom"];

                var limparBtn = btnGroup.add("button", undefined, "Limpar");
                var baixarBtn = btnGroup.add("button", undefined, "Baixar Fotos");
                var fecharBtn = btnGroup.add("button", undefined, "Fechar");

                limparBtn.onClick = function () {
                    linksInputModal.text = "";
                };

                function getRankingSelecionado() {
                    if (top10Radio.value) return "10";
                    if (top11Radio.value) return "11";
                    return "20";
                }

                baixarBtn.onClick = function () {
                    linksTexto = linksInputModal.text;
                    rankingSelecionadoTexto = getRankingSelecionado();
                    comecaNoQuartoTexto = comecaNoQuartoCheck.value;
                    var iniciado = baixarFotosDosLinks(linksTexto, rankingSelecionadoTexto, comecaNoQuartoTexto);
                    if (iniciado) {
                        linksWin.close();
                    }
                };

                fecharBtn.onClick = function () {
                    linksTexto = linksInputModal.text;
                    rankingSelecionadoTexto = getRankingSelecionado();
                    comecaNoQuartoTexto = comecaNoQuartoCheck.value;
                    linksWin.close();
                };

                linksWin.onResizing = linksWin.onResize = function () {
                    this.layout.resize();
                };

                linksWin.center();
                linksWin.show();
            };

            var importFotosBtn = fotosPanel.add("button", undefined, "Importar Fotos");
            importFotosBtn.preferredSize.height = 28;

            importFotosBtn.onClick = function () {
                var pasta = Folder.selectDialog("Selecione a pasta com as fotos");
                if (!pasta) return;
                importarFotosDaPasta(pasta);
            };

            var limparFotosBtn = fotosPanel.add("button", undefined, "Limpar Fotos");
            limparFotosBtn.preferredSize.height = 28;

            limparFotosBtn.onClick = function () {
                app.beginUndoGroup("Limpar Fotos");

                var compsAfetadas = 0;

                for (var i = 1; i <= app.project.numItems; i++) {
                    var item = app.project.item(i);

                    if (item instanceof CompItem) {
                        var nome = item.name.toLowerCase();

                        if (/^foto\s*\d+$/i.test(nome)) {
                            while (item.numLayers > 0) {
                                item.layer(1).remove();
                            }
                            compsAfetadas++;
                        }
                    }
                }

                app.endUndoGroup();
                alert("Fotos removidas de " + compsAfetadas + " composições.");
            };

            var timingPanel = extrasWin.add("panel", undefined, "Layer Timing");
            timingPanel.orientation = "column";
            timingPanel.alignChildren = ["fill", "top"];
            timingPanel.margins = [12, 22, 12, 12];
            timingPanel.spacing = 8;

            var timingPushBtn = timingPanel.add("button", undefined, "Aumentar Layer");
            timingPushBtn.preferredSize.height = 28;

            timingPushBtn.onClick = function () {
                aplicarTimingPushExtra();
            };


            var layoutPanel = extrasWin.add("panel", undefined, "Layout");
            layoutPanel.orientation = "column";
            layoutPanel.alignChildren = ["fill", "top"];
            layoutPanel.margins = [12, 22, 12, 12];
            layoutPanel.spacing = 8;

            var ocultarTagsBtn = layoutPanel.add("button", undefined, "Ocultar Tags");
            ocultarTagsBtn.preferredSize.height = 28;

            ocultarTagsBtn.onClick = function () {
                ocultarTagsECentralizarNomesNaRaiz();
            };

            var restaurarTagsBtn = layoutPanel.add("button", undefined, "Restaurar Tags");
            restaurarTagsBtn.preferredSize.height = 28;

            restaurarTagsBtn.onClick = function () {
                restaurarTagsEPosicaoNaRaiz();
            };

            var reduzirNomesBtn = layoutPanel.add("button", undefined, "Diminuir Texto para 90%");
            reduzirNomesBtn.preferredSize.height = 28;

            reduzirNomesBtn.onClick = function () {
                reduzirTamanhoNomesNaRaiz();
            };

            var fecharExtrasBtn = extrasWin.add("button", undefined, "Fechar Ferramentas Extras");
            fecharExtrasBtn.preferredSize.height = 28;

            fecharExtrasBtn.onClick = function () {
                extrasWin.close();
            };

            extrasWin.onClose = function () {
                extrasWindow = null;
            };

            extrasWin.onResizing = extrasWin.onResize = function () {
                this.layout.resize();
            };

            extrasWin.layout.layout(true);
            return extrasWin;
        }

        var extrasPanel = win.add("panel", undefined, "Ações extras");
        extrasPanel.orientation = "column";
        extrasPanel.alignChildren = ["fill", "top"];
        extrasPanel.margins = [12, 22, 12, 12];
        extrasPanel.spacing = 8;

        var abrirExtrasBtn = extrasPanel.add("button", undefined, "Abrir Ferramentas Extras");
        abrirExtrasBtn.preferredSize.height = 34;

        abrirExtrasBtn.onClick = function () {
            if (extrasWindow && extrasWindow.visible) {
                extrasWindow.active = true;
                return;
            }

            extrasWindow = criarJanelaExtras();
            extrasWindow.center();
            extrasWindow.show();
        };

        var footer = win.add("group");
        footer.alignment = ["fill", "bottom"];
        footer.alignChildren = ["center", "center"];

        var watermark = footer.add(
            "statictext",
            undefined,
            "Versão 1.7.10 - Build Stable - Wiser Educação © 2026"
        );

        watermark.alignment = ["center", "center"];
        watermark.justify = "center";
        watermark.graphics.font = ScriptUI.newFont("Arial", "REGULAR", 9);

        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        win.layout.layout(true);
        return win;
    }

    var myUI = buildUI(this);
    if (myUI instanceof Window) {
        myUI.center();
        myUI.show();
    }
}