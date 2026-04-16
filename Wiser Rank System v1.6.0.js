{
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "Wiser Rank System v1.6.0", undefined);

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

        var importBtn = win.add("button", undefined, "Importar (CSV / TSV)");
        importBtn.alignment = ["fill", "top"];

        importBtn.onClick = function () {
            var file = File.openDialog("Selecione CSV ou TSV");
            if (!file) return;

            file.open("r");
            var content = file.read();
            file.close();

            content = content.replace(/\r/g, "");
            var linhas = content.split("\n");

            var separador = "\t";
            if (linhas[0].indexOf("\t") !== -1) separador = "\t";
            else if (linhas[0].indexOf(";") !== -1) separador = ";";
            else if (linhas[0].indexOf(",") !== -1) separador = ",";

            function clean(v) {
                if (!v) return "";
                return v.replace(/^"|"$/g, "").replace(/^\s+|\s+$/g, "");
            }

            var count = 0;

            for (var i = 0; i < linhas.length && count < 20; i++) {
                if (linhas[i].replace(/\s/g, "") === "") continue;

                var partes = linhas[i].split(separador);
                inputs[count].nome.text = clean(partes[0]);
                inputs[count].tag.text = clean(partes[1]);
                count++;
            }

            win.update();
            alert("Importação concluída!");
        };

        function getOrdemNome(nome) {
            var mapa = {
                "primeiro lugar": 1,
                "segundo lugar": 2,
                "terceiro lugar": 3,
                "quarto lugar": 4,
                "quinto lugar": 5,
                "sexto lugar": 6,
                "sétimo lugar": 7,
                "setimo lugar": 7,
                "oitavo lugar": 8,
                "nono lugar": 9,
                "décimo lugar": 10,
                "decimo lugar": 10,
                "11º lugar": 11,
                "12º lugar": 12,
                "13º lugar": 13,
                "14º lugar": 14,
                "15º lugar": 15,
                "16º lugar": 16,
                "17º lugar": 17,
                "18º lugar": 18,
                "19º lugar": 19,
                "20º lugar": 20
            };

            var n = nome.toLowerCase();
            if (mapa[n] !== undefined) return mapa[n];

            var m = n.match(/(\d+)/);
            if (m) return parseInt(m[1], 10);

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

        var importFotosBtn = win.add("button", undefined, "Importar Fotos");
        importFotosBtn.alignment = ["fill", "top"];

        importFotosBtn.onClick = function () {
            var pasta = Folder.selectDialog("Selecione a pasta com as fotos");
            if (!pasta) return;

            app.beginUndoGroup("Importar Fotos");

            var arquivos = pasta.getFiles(function(f) {
                return f instanceof File && f.name.match(/\.(jpg|jpeg|png|psd)$/i);
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
                if (
                    item instanceof FolderItem &&
                    item.name === "FOTOS" &&
                    item.parentFolder === resourcesFolder
                ) {
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
        };

        var applyBtn = win.add("button", undefined, "Aplicar");
        applyBtn.alignment = ["fill", "top"];

        applyBtn.onClick = function () {
            app.beginUndoGroup("Renomear Ranking");

            var nameComps = [];
            var tagComps = [];
            var categoriaComp = null;

            for (var j = 1; j <= app.project.numItems; j++) {
                var item = app.project.item(j);
                if (!(item instanceof CompItem)) continue;

                var name = item.name.toLowerCase();

                if (name === "categoria") {
                    categoriaComp = item;
                    continue;
                }

                if (/^foto\s*\d+$/i.test(name)) {
                    continue;
                }

                if (name.indexOf("tag") !== -1) {
                    tagComps.push(item);
                } else {
                    nameComps.push(item);
                }
            }

            nameComps.sort(function(a, b) {
                return getOrdemNome(a.name) - getOrdemNome(b.name);
            });

            tagComps.sort(function(a, b) {
                return getOrdemNome(a.name) - getOrdemNome(b.name);
            });

            var itensParaRenomear = [];

            for (var i = 0; i < nameComps.length && i < 20; i++) {
                var nomeFinal = inputs[i].nome.text;
                if (nomeFinal !== "") {
                    itensParaRenomear.push({
                        item: nameComps[i],
                        finalName: nomeFinal
                    });
                }
            }

            for (var i = 0; i < tagComps.length && i < 20; i++) {
                var tagFinal = inputs[i].tag.text;
                if (tagFinal !== "") {
                    itensParaRenomear.push({
                        item: tagComps[i],
                        finalName: tagFinal
                    });
                }
            }

            if (categoriaComp && categoriaInput.text !== "") {
                itensParaRenomear.push({
                    item: categoriaComp,
                    finalName: categoriaInput.text
                });
            }

            for (var i = 0; i < itensParaRenomear.length; i++) {
                itensParaRenomear[i].item.name = "__temp__" + i + "__";
            }

            for (var i = 0; i < itensParaRenomear.length; i++) {
                itensParaRenomear[i].item.name = itensParaRenomear[i].finalName;
            }

            app.endUndoGroup();
            alert("Renomeação concluída!");
        };

        var footer = win.add("group");
        footer.alignment = ["fill", "bottom"];
        footer.alignChildren = ["center", "center"];

        var watermark = footer.add(
            "statictext",
            undefined,
            "Versão 1.6.0 - Build Stable - Wiser Educação © 2026"
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