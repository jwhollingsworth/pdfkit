// Generated by CoffeeScript 1.9.1
(function() {
  var LineWrapper;

  LineWrapper = require('../line_wrapper');

  module.exports = {
    initTables: function() {
      return console.log('init tables');
    },
    table: function(data, options) {
      var j, len, row, rowIndex;
      this.tableOptions = options;
      this.rowY = this.tableOptions.y || this.page.margins.top + this.tableOptions.margins.top;
      this.printHeaderRow();
      for (rowIndex = j = 0, len = data.length; j < len; rowIndex = ++j) {
        row = data[rowIndex];
        this.printRow(rowIndex, row);
      }
      this.y += this.tableOptions.padding.bottom + this.tableOptions.margins.bottom;
      return this.x = this.tableOptions.margins.left;
    },
    printRow: function(rowIndex, row) {
      var col, colIndex, j, k, len, len1, ref, ref1;
      var maxHeight = 0;
      this.rowHeight = this.getRowHeight(row);
      if (this.rowY + this.rowHeight > this.page.height - this.page.margins.bottom) {
        this.addPage();
        this.rowY = this.page.margins.top + this.tableOptions.margins.top;
        this.printHeaderRow();
        this.rowHeight = this.getRowHeight(row);
      }
      ref = this.tableOptions.columns;
      for (colIndex = j = 0, len = ref.length; j < len; colIndex = ++j) {
        col = ref[colIndex];
        if (this.y > maxHeight) {
          maxHeight = this.y;
        }
        this.printCol(rowIndex, row, colIndex, col);
      }
      this.moveTo(this.tableOptions.margins.left + this.getWidth(), maxHeight + this.tableOptions.padding.bottom).lineTo(this.tableOptions.margins.left, maxHeight + this.tableOptions.padding.bottom).stroke();
      if (this.needsVerticalLines()) {
        ref1 = this.tableOptions.columns;
        for (colIndex = k = 0, len1 = ref1.length; k < len1; colIndex = ++k) {
          col = ref1[colIndex];
          this.moveTo(this.getXOfColumn(colIndex), this.rowY).lineTo(this.getXOfColumn(colIndex), maxHeight + this.tableOptions.padding.bottom).stroke();
        }
        this.moveTo(this.tableOptions.margins.left + this.getWidth(), this.rowY).lineTo(this.tableOptions.margins.left + this.getWidth(), maxHeight + this.tableOptions.padding.bottom).stroke();
      }
      this.rowY = maxHeight;
      return this.rowY += this.tableOptions.padding.bottom;
    },
    printRow: function(rowIndex, row) {
      var col, colIndex, j, k, len, len1, ref, ref1;
      var tempCol;
      var addingPage = false;
      var maxHeight = 0;
      this.rowHeight = this.getRowHeight(row);
      ref = this.tableOptions.columns;

      for (colIndex = j = 0, len = ref.length; j < len; colIndex = ++j) {
        if (colIndex === 0) {
          for (var i = 0; i < len; i++) {
            tempCol = row[ref[i].id];
            if (this.rowY + this.tableOptions.padding.bottom + (this.rowY - this.y) + this.rowHeight + 12 > this.page.height - this.page.margins.bottom) {
              addingPage = true;
            }
          }
          if (addingPage) {
            this.addPage();
            this.rowY = this.page.margins.top + this.tableOptions.margins.top;
            this.printHeaderRow();
            this.rowHeight = this.getRowHeight(row);
            this.y = this.rowY;
            addingPage = false;
          }
        }
        col = ref[colIndex];
        if (this.y > maxHeight) {
          maxHeight = this.y;
        }
        this.printCol(rowIndex, row, colIndex, col);
      }
      this.moveTo(this.tableOptions.margins.left + this.getWidth(), maxHeight + this.tableOptions.padding.bottom).lineTo(this.tableOptions.margins.left, maxHeight + this.tableOptions.padding.bottom).stroke();
      if (this.needsVerticalLines()) {
        ref1 = this.tableOptions.columns;
        for (colIndex = k = 0, len1 = ref1.length; k < len1; colIndex = ++k) {
          col = ref1[colIndex];
          this.moveTo(this.getXOfColumn(colIndex), this.rowY).lineTo(this.getXOfColumn(colIndex), maxHeight + this.tableOptions.padding.bottom).stroke();
        }
        this.moveTo(this.tableOptions.margins.left + this.getWidth(), this.rowY).lineTo(this.tableOptions.margins.left + this.getWidth(), maxHeight + this.tableOptions.padding.bottom).stroke();
      }
      this.rowY = maxHeight;
      return this.rowY += this.tableOptions.padding.bottom;
    },
    printCol: function(rowIndex, row, colIndex, col) {
      var colOpt, text;
      colOpt = this.tableOptions.columns[colIndex];
      text = row[col.id] || '';
      if (colOpt.renderer) {
        text = colOpt.renderer(text);
      }
      return this.font(this.tableOptions.font).text(text, this.getXOfColumn(colIndex) + this.tableOptions.padding.left, this.rowY + this.tableOptions.padding.top, {
        width: this.getColWidth(colIndex)
      });
    },
    printHeaderRow: function() {
      var col, colIndex, j, k, len, len1, ref, ref1;
      this.rowHeight = 30;
      ref = this.tableOptions.columns;
      for (colIndex = j = 0, len = ref.length; j < len; colIndex = ++j) {
        col = ref[colIndex];
        this.printHeaderCol(colIndex);
      }
      this.moveTo(this.tableOptions.margins.left, this.rowY).lineTo(this.tableOptions.margins.left + this.getWidth(), this.rowY).lineTo(this.tableOptions.margins.left + this.getWidth(), this.rowY + 1).lineTo(this.tableOptions.margins.left, this.rowY + 1).stroke();
      this.moveTo(this.tableOptions.margins.left + this.getWidth(), this.rowY + this.rowHeight).lineTo(this.tableOptions.margins.left, this.rowY + this.rowHeight).lineTo(this.tableOptions.margins.left + this.getWidth(), this.rowY + this.rowHeight + 1).lineTo(this.tableOptions.margins.left, this.rowY + this.rowHeight + 1).stroke();
      if (this.needsVerticalLines()) {
        ref1 = this.tableOptions.columns;
        for (colIndex = k = 0, len1 = ref1.length; k < len1; colIndex = ++k) {
          col = ref1[colIndex];
          this.moveTo(this.getXOfColumn(colIndex), this.rowY).lineTo(this.getXOfColumn(colIndex), this.rowY + this.rowHeight).stroke();
        }
        this.moveTo(this.tableOptions.margins.left + this.getWidth(), this.rowY).lineTo(this.tableOptions.margins.left + this.getWidth(), this.rowY + this.rowHeight).stroke();
      }
      return this.rowY += this.rowHeight;
    },
    printHeaderCol: function(colIndex) {
      return this.font(this.tableOptions.boldFont).text(this.tableOptions.columns[colIndex].name || '', this.getXOfColumn(colIndex) + this.tableOptions.padding.left, this.rowY + this.tableOptions.padding.top, {
        width: this.getColWidth(colIndex)
      });
    },
    getColWidth: function(colIndex) {
      return this.getXOfColumn(colIndex + 1) - this.getXOfColumn(colIndex) - this.tableOptions.padding.left;
    },
    getRowHeight: function(row) {
      var col, colIndex, height, j, len, line, maxHeight, ref, wrapper;
      maxHeight = 0;
      ref = this.tableOptions.columns;
      for (colIndex = j = 0, len = ref.length; j < len; colIndex = ++j) {
        col = ref[colIndex];
        height = 0;
        line = function() {
          return height += this.currentLineHeight(true);
        };
        height = height += this.currentLineHeight(true);
        wrapper = new LineWrapper(this, {});
        wrapper.on('line', line.bind(this));
        wrapper.wrap(row[col.id] + '' || '', {
          width: this.getColWidth(colIndex)
        });
        if (height > maxHeight) {
          maxHeight = height;
        }
      }
      return maxHeight + this.tableOptions.padding.bottom + 8;
    },
    getXOfColumn: function(colIndex) {
      var col, i, j, len, perc, ref;
      perc = 0;
      ref = this.tableOptions.columns;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        col = ref[i];
        if (i < colIndex) {
          perc += col.width;
        }
      }
      return this.tableOptions.margins.left + (this.getWidth() * perc / 100);
    },
    needsVerticalLines: function() {
      return !this.tableOptions.noVerticalLines || this.tableOptions.noVerticalLines === false;
    },
    getWidth: function() {
      return this.page.width - (this.tableOptions.margins.left + this.tableOptions.margins.right);
    }
  };

}).call(this);
