
import { bindable, BindingMode, customElement, inject, PLATFORM } from "aurelia";
import "select2";
import * as uniqid from "uniqid";
import $ from "jquery";
import "select2/dist/js/select2.min.js";
@inject(Element)
@customElement("select2")
export class Select2 {
    @bindable({ mode: BindingMode.twoWay }) name: string = uniqid.default();

    @bindable({
        mode: BindingMode.twoWay,
        callback: "itemsChanged",
    })
    items: any[] = null;
    @bindable({ mode: BindingMode.twoWay }) disabled = false;
    @bindable({ mode: BindingMode.twoWay }) placeholder: string = null;
    @bindable({
        mode: BindingMode.twoWay,
        callback: "selectedValuesChanged",
    })
    selectedValues: any = null;

    @bindable({ mode: BindingMode.twoWay }) isMultiple = false;
    @bindable({ mode: BindingMode.twoWay }) isTags = false;
    @bindable({ mode: BindingMode.twoWay })
    isAllowedClear = false;
    @bindable({
        mode: BindingMode.twoWay,
        callback: "selectedItemsChanged",
    })
    selectedItems: any = null;

    @bindable() Open: Function = null;
    @bindable() Close: Function = null;
    @bindable() Change: Function = null;
    @bindable() CalculateItemId: any = null;
    @bindable() CalculateItemText: any = null;
    @bindable() CalculateGroupText: any = null;
    @bindable() CalculateGroupItems: any = null;
    @bindable() FormatItem: Function = null;
    @bindable() FormatSelectedItem: Function = null;
    @bindable() SearchAutoCompleteFunction: Function = null;
    @bindable() Select: Function = null;
    @bindable() Unselect: Function = null;
    @bindable() IsGroup = false;
    @bindable() EnableSearchBox = false;
    @bindable() MaxSelectedItems = 99999999;
    @bindable() MinLength = 0;
    @bindable() EnableCustomDisplay = false;
    @bindable() LoadDelay = 500;
    IsEditMode = false;

    autoCompleteObject: any;
    currentSearchTerms: string;
    element;
    select2 = null;
    constructor(element: Element) {
        
        this.element = element;
    }

    ignoreSelectedDataChanged = false;

    selectedValuesChanged() {
        if (this.select2 != null && this.SearchAutoCompleteFunction == null) {
            this.select2.val(this.selectedValues).trigger("change");
        }
    }

    selectedItemsChanged() {
        if (this.Loading) return;
        const self = this;
        if (this.ignoreSelectedDataChanged) return;
        this.ignoreSelectedDataChanged = true;

        if (this.selectedItems != null) {
            //auto complete
            if (this.SearchAutoCompleteFunction != null) {
                //multiple
                if (Array.isArray(this.selectedItems)) {
                    const options = [];

                    for (let i = 0; i < this.selectedItems.length; i++) {
                        const item = this.selectedItems[i];

                        self.TransformData(item);

                        const newOption = new Option(item.text, item.id, true, true);
                        options.push(newOption);
                    }
                    $(this.select2).empty();
                    $(this.select2).append(options).trigger("change");
                }
                //single
                else {
                    self.TransformData(this.selectedItems);

                    const newOption = new Option(
                        this.selectedItems.text,
                        this.selectedItems.id,
                        true,
                        true
                    );
                    $(this.select2).empty();
                    $(this.select2).append(newOption).trigger("change");
                }
            }
        } else {
            this.selectedValues = null;
            $(this.select2).val(this.selectedValues).trigger("change.select2");
        }

        // this.tq.queueMicroTask(() => this.ignoreSelectedDataChanged = false);

            // Update styles or DOM
            self.ignoreSelectedDataChanged = false;
  
    }

    itemsChanged() {
        const self = this;
        if (
            this.select2 != null &&
            self.items != null &&
            Array.isArray(self.items) &&
            self.SearchAutoCompleteFunction == null
        ) {
            const select2Options = this.CreateSelect2Options();
            this.select2.empty();
            self.select2.select2(select2Options);

            if (self.items == null && self.selectedItems != null) {
                self.SetAutocompleteSelectedItem(self.selectedItems);
            } else if (self.selectedValues != null) {
                self.select2.val(self.selectedValues).trigger("change");
            }
        }
    }

    Loading = false;

    attached() {
        this.Loading = true;

        const self = this;
        const select2Options = this.CreateSelect2Options();

        const t = $(self.element).find("select");
        self.select2 = t.select2(select2Options);
        if (self.select2 != null) {
            self.select2.on("change", (evt) => {
                if (evt.originalEvent) {
                    return;
                }
                if (
                    (self.items != null &&
                        self.items.length > 0 &&
                        self.SearchAutoCompleteFunction == null) ||
                    self.SearchAutoCompleteFunction != null
                ) {
                    const notice = new Event("change", { bubbles: true });
                    $(self.select2)[0].dispatchEvent(notice);

                    if (
                        this.Loading == false &&
                        this.ignoreSelectedDataChanged == false
                    ) {
                        if (!self.isMultiple) {
                            if (self.selectedValues != null) {
                                const selectData = self.select2.select2("data")[0];
                                if (!self.IsGroup) {
                                    if (
                                        self.autoCompleteObject != null &&
                                        Array.isArray(self.autoCompleteObject)
                                    ) {
                                        self.selectedItems = self.autoCompleteObject.find(
                                            (t) => t.id == selectData.id
                                        );
                                    } else {
                                        self.selectedItems = self.items.find(
                                            (t) => t.id == selectData.id
                                        );
                                    }
                                } else {
                                    if (
                                        self.autoCompleteObject != null &&
                                        Array.isArray(self.autoCompleteObject)
                                    ) {
                                        self.selectedItems = self.autoCompleteObject
                                            .map(function (p) {
                                                return p.children;
                                            })
                                            .reduce(function (a, b) {
                                                return a.concat(b);
                                            })
                                            .find((t) => t.id == selectData.id);
                                    } else {
                                        self.selectedItems = self.items.find(
                                            (t) => t.id == selectData.id
                                        );
                                    }
                                }
                            } else {
                                self.selectedItems = null;
                            }
                        } else {
                            if (Array.isArray(self.selectedValues)) {
                                if (self.selectedValues.length > 0) {
                                    const select2Data = self.select2.select2("data");
                                    if (self.selectedItems == null) self.selectedItems = [];
                                    const addData = select2Data.filter(function (i) {
                                        return (
                                            self.selectedItems.map((t) => t.id).indexOf(i.id) < 0
                                        );
                                    });
                                    const removeData = self.selectedItems.filter(function (i) {
                                        return select2Data.map((t) => t.id).indexOf(i.id) < 0;
                                    });
                                    addData.forEach((item) => {
                                        self.selectedItems.push(item);
                                    });
                                    removeData.forEach((item, i) => {
                                        const index = self.selectedItems.indexOf(item);
                                        self.selectedItems.splice(index, 1);
                                    });
                                } else {
                                    self.selectedItems = [];
                                }
                            } else if (!Array.isArray(self.selectedValues)) {
                                self.selectedItems = self.select2.select2("data");
                            }
                        }
                    }

                    if (self.Change != null) {
                        self.Change({ e: self.selectedItems });
                    }
                }
            });

            $(self.select2).on("select2:select", function (e) {
                //   ;

                if (self.Select != null) {
                    self.Select({ e: e });
                }
            });

            $(self.select2).on("select2:unselecting", function (e: any) {
                //   ;
                if (self.Unselect != null) {
                    self.Unselect({ e: e });
                }
            });

            $(self.select2).on("select2:open", function (e) {
                //   ;
                /*const search = self.select2.data('select2').dropdown.$search || self.select2.data('select2').selection.$search;
        
                if (search != null) {
                    if (self.isMultiple == false && self.selectedItems != null) {
                        search.val(self.selectedItems.text);
                    }
                }*/
                if (self.Open != null) {
                    self.Open({ e: e });
                }
            });
            $(self.select2).on("select2:close", function (e: any) {
                if (self.Close != null) {
                    self.Close({ e: e });
                }

                if (
                    self.autoCompleteObject != null &&
                    Array.isArray(self.autoCompleteObject) &&
                    self.autoCompleteObject.length == 0 &&
                    !self.isMultiple
                ) {
                    self.select2.val(null).trigger("change");
                }

                if (self.EnableCustomDisplay) {
                    self.IsEditMode = false;
                    $(self.element).children(".select2-container").hide();
                }
            });
            if (
                self.items == null &&
                self.selectedItems != null &&
                self.SearchAutoCompleteFunction != null
            ) {
                self.SetAutocompleteSelectedItem(self.selectedItems);
            } else if (self.selectedValues != null) {
                self.select2.val(self.selectedValues).trigger("change");
            }

            if (self.EnableCustomDisplay) {
                $(self.element).children(".select2-container").hide();
            }
        }

        this.Loading = false;
    }

    public ShowSelect2Options() {
        if (!this.EnableCustomDisplay || this.disabled) return;
        this.IsEditMode = true;
        $(this.element).children(".select2-container").show();
        this.select2.select2("open");
    }

    private CreateSelect2Options() {
        const self = this;
        //Create the select2 dropdown
        const select2Options: any = {};
        select2Options.placeholder = self.placeholder;
        select2Options.allowClear = self.isAllowedClear;
        select2Options.width = "100%";
        select2Options.height = "100%";
        select2Options.minimumInputLength = self.MinLength;
        select2Options.tags = self.isTags;
        if (this.isMultiple) {
            select2Options.maximumSelectionLength = self.MaxSelectedItems;
        }
        if (
            self.items != null &&
            Array.isArray(self.items) &&
            self.SearchAutoCompleteFunction == null
        ) {
            if (!self.EnableSearchBox) {
                select2Options.minimumResultsForSearch = -1;
            }

            select2Options.data = $.map(self.items, function (obj) {
                if (self.IsGroup) {
                    if (self.CalculateGroupText != null) {
                        if (self.CalculateGroupText instanceof Function) {
                            obj.text = self.CalculateGroupText({ item: obj });
                        } else {
                            if (typeof self.CalculateGroupText == "string") {
                                obj.text = obj[self.CalculateGroupText];
                            }
                        }
                    }

                    if (self.CalculateGroupItems != null) {
                        if (self.CalculateGroupItems instanceof Function) {
                            obj.children = self.CalculateGroupItems({ item: obj });
                        } else {
                            if (typeof self.CalculateGroupItems == "string") {
                                obj.children = obj[self.CalculateGroupItems];
                            }
                        }
                    }

                    if (Array.isArray(obj.children)) {
                        for (let i = 0; i < obj.children.length; i++) {
                            self.TransformData(obj.children[i]);
                        }
                    }
                } else {
                    self.TransformData(obj);
                }

                return obj;
            });
        } else {
            select2Options.ajax = {
                delay: self.LoadDelay,
                transport: function (params, success, failure) {
                    if (self.SearchAutoCompleteFunction != null) {
                        self.SearchAutoCompleteFunction({
                            params: params,
                            success: success,
                            failure: failure,
                        });
                    }
                },
                processResults: function (data, params) {
                    {
                        const result = $.map(data, function (obj) {
                            if (self.IsGroup) {
                                if (self.CalculateGroupText != null) {
                                    if (self.CalculateGroupText instanceof Function) {
                                        obj.text = self.CalculateGroupText({ item: obj });
                                    } else {
                                        if (typeof self.CalculateGroupText == "string") {
                                            obj.text = obj[self.CalculateGroupText];
                                        }
                                    }
                                }

                                if (self.CalculateGroupItems != null) {
                                    if (self.CalculateGroupItems instanceof Function) {
                                        obj.children = self.CalculateGroupItems({ item: obj });
                                    } else {
                                        if (typeof self.CalculateGroupItems == "string") {
                                            obj.children = obj[self.CalculateGroupItems];
                                        }
                                    }
                                }

                                if (Array.isArray(obj.children)) {
                                    for (let i = 0; i < obj.children.length; i++) {
                                        self.TransformData(obj.children[i]);
                                    }
                                }
                            } else {
                                self.TransformData(obj);
                            }

                            return obj;
                        });

                        self.autoCompleteObject = result;
                        return {
                            results: result,
                        };
                    }
                },
            };
        }
        select2Options.escapeMarkup = function (markup) {
            return markup;
        };
        if (self.FormatItem != null) {
            select2Options.templateResult = function (data) {
                return self.FormatItem({ data: data });
            };
        }
        if (self.FormatSelectedItem != null) {
            select2Options.templateSelection = function (data) {
                return self.FormatSelectedItem({ data: data });
            };
        }

        return select2Options;
    }

    TransformData(item) {
        const self = this;
        if (self.CalculateItemId != null) {
            if (self.CalculateItemId instanceof Function) {
                const data = self.CalculateItemId({ item: item });

                if (data != null) {
                    item.id = data;
                }
            } else {
                if (typeof self.CalculateItemId == "string") {
                    const data = item[self.CalculateItemId];
                    if (data != null) {
                        item.id = data;
                    }
                }
            }
        }

        if (self.CalculateItemText != null) {
            if (self.CalculateItemText instanceof Function) {
                const data = self.CalculateItemText({ item: item });
                if (data != null) {
                    item.text = data;
                }
            } else {
                if (typeof self.CalculateItemText == "string") {
                    const data = item[self.CalculateItemText];
                    if (data != null) {
                        item.text = data;
                    }
                }
            }
        }
    }

    public SetAutocompleteSelectedItem(data: any) {
        const self = this;
        const options = [];
        if (Array.isArray(data)) {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    self.TransformData(item);

                    const newOption = new Option(item.text, item.id, true, true);
                    options.push(newOption);
                }
            }
        } else {
            if (data != null) {
                self.TransformData(data);
                const newOption = new Option(data.text, data.id, true, true);
                options.push(newOption);
            }
        }
        $(this.select2).append(options).trigger("change");
    }

    detached() {
        if (this.select2 != null && this.select2.data("select2"))
            this.select2.select2("destroy");
    }
}
