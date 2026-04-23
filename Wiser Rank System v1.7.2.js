{
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "Wiser Rank System v1.7.2", undefined);

        var linksTexto = "";

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
                var an = a.name.toLowerCase();
                var bn = b.name.toLowerCase();
                if (an < bn) return -1;
                if (an > bn) return 1;
                return 0;
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

            var fotoComps = [];

            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem) {
                    var nomeComp = item.name.toLowerCase();
                    if (/^foto\s*\d+$/i.test(nomeComp)) {
                        fotoComps.push(item);
                    }
                }
            }

            fotoComps.sort(function(a, b) {
                return getNumeroFoto(a.name) - getNumeroFoto(b.name);
            });

            var limite = Math.min(20, arquivos.length, fotoComps.length);

            for (var i = 0; i < limite; i++) {
                var importOptions = new ImportOptions(arquivos[i]);
                var footage = app.project.importFile(importOptions);

                footage.name = "foto " + ("0" + (i + 1)).slice(-2);
                footage.parentFolder = fotosFolder;

                montarCompFoto(fotoComps[i], footage);
            }

            app.endUndoGroup();
            alert("Fotos importadas com sucesso!");
        }

        function escaparPS(txt) {
            return String(txt).replace(/'/g, "''");
        }

        function escaparBAT(txt) {
            return String(txt).replace(/"/g, '""');
        }

        function baixarFotosDosLinks(textoLinks) {
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

            if (links.length > 20) {
                alert("Apenas os 20 primeiros serão usados.");
            }

            var total = Math.min(20, links.length);

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
            ps.push("Write-Host 'Pasta de destino: ' $destino");
            ps.push("Write-Host ''");

            for (var j = 0; j < total; j++) {
                var url = links[j];
                var ext = detectarExtensao(url);
                var nomeArquivo = "foto_" + ("0" + (j + 1)).slice(-2) + ext;

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

        var applyBtn = win.add("button", undefined, "Aplicar");
        applyBtn.alignment = ["fill", "top"];
        applyBtn.preferredSize.height = 40;

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

        var extrasPanel = win.add("panel", undefined, "Ações extras");
        extrasPanel.orientation = "column";
        extrasPanel.alignChildren = ["fill", "top"];
        extrasPanel.margins = [12, 22, 12, 12];
        extrasPanel.spacing = 8;

        var criarIdsBtn = extrasPanel.add("button", undefined, "Criar IDs Aleatórias");
        criarIdsBtn.preferredSize.height = 28;

        criarIdsBtn.onClick = function () {
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
        };

        var importBtn = extrasPanel.add("button", undefined, "Importar (CSV / TSV)");
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

        var abrirLinksBtn = extrasPanel.add("button", undefined, "Links das Fotos");
        abrirLinksBtn.preferredSize.height = 28;

        abrirLinksBtn.onClick = function () {
            var linksWin = new Window("dialog", "Links das Fotos");
            linksWin.orientation = "column";
            linksWin.alignChildren = ["fill", "top"];
            linksWin.spacing = 10;
            linksWin.margins = 15;

            linksWin.add("statictext", undefined, "Cole até 20 links, um por linha:");

            var linksInputModal = linksWin.add("edittext", undefined, linksTexto, {
                multiline: true,
                scrolling: true
            });
            linksInputModal.preferredSize = [520, 260];

            var btnGroup = linksWin.add("group");
            btnGroup.orientation = "row";
            btnGroup.alignment = ["fill", "top"];

            var limparBtn = btnGroup.add("button", undefined, "Limpar");
            var baixarBtn = btnGroup.add("button", undefined, "Baixar Fotos");
            var fecharBtn = btnGroup.add("button", undefined, "Fechar");

            limparBtn.onClick = function () {
                linksInputModal.text = "";
            };

            baixarBtn.onClick = function () {
                linksTexto = linksInputModal.text;
                var iniciado = baixarFotosDosLinks(linksTexto);
                if (iniciado) {
                    linksWin.close();
                }
            };

            fecharBtn.onClick = function () {
                linksTexto = linksInputModal.text;
                linksWin.close();
            };

            linksWin.center();
            linksWin.show();
        };

        var importFotosBtn = extrasPanel.add("button", undefined, "Importar Fotos");
        importFotosBtn.preferredSize.height = 28;

        importFotosBtn.onClick = function () {
            var pasta = Folder.selectDialog("Selecione a pasta com as fotos");
            if (!pasta) return;
            importarFotosDaPasta(pasta);
        };

        var limparFotosBtn = extrasPanel.add("button", undefined, "Limpar Fotos");
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

        var footer = win.add("group");
        footer.alignment = ["fill", "bottom"];
        footer.alignChildren = ["center", "center"];

        var watermark = footer.add(
            "statictext",
            undefined,
            "Versão 1.7.2 - Build Stable - Wiser Educação © 2026"
        );

        watermark.alignment = ["center", "center"];
        watermark.justify = "center";
        watermark.graphics.font = ScriptUI.newFont("Arial", "REGULAR", 9);

        win.layout.layout(true);
        return win;
    }

    var myUI = buildUI(this);
    if (myUI instanceof Window) {
        myUI.center();
        myUI.show();
    }
}