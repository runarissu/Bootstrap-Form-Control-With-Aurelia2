/* eslint-disable @typescript-eslint/no-this-alias */


import { inject, bindable, BindingMode, customElement } from "aurelia"; 
import moment from "moment";


@customElement("date-range-picker")
export class DateRangePicker {
  @bindable({ mode: BindingMode.twoWay, callback: "startDateChanged" })  startDate;
  @bindable({ mode: BindingMode.twoWay, callback: "endDateChanged" }) endDate;
  @bindable({ mode: BindingMode.twoWay, callback: "ConfigChanged" }) minDate;
  @bindable({ mode: BindingMode.twoWay, callback: "ConfigChanged" }) maxDate;
  @bindable({ mode: BindingMode.twoWay, callback: "ConfigChanged" }) format =
    "DD/MM/YYYY";
  options;

  @bindable({ mode: BindingMode.twoWay }) disabled = false;
  get DisplayDate() {
    return (
      (this.startDate == null ? "" : this.startDate) +
      " - " +
      (this.endDate == null ? "" : this.endDate)
    );
  }

  element: any;
  owningView: any;

  created(owningView) {
    this.owningView = owningView;
    }
   
    attached() {
        
    const self = this;
    this.CreateConfig();

    if (self.startDate != null) {
      this.options = $.extend(this.options, {
        startDate: moment(self.startDate, self.options.locale.format),
      });
    }

    if (self.endDate != null) {
      this.options = $.extend(this.options, {
        endDate: moment(self.endDate, self.options.locale.format),
      });
    }

    $(this.element).daterangepicker(this.options);

    $(this.element).on("apply.daterangepicker", function (ev, picker) {
      self.apply(picker.startDate, picker.endDate);
    });

    $(this.element).on("cancel.daterangepicker", function (ev, picker) {
      self.apply(null, null);
    });
  }

  apply(startDate, endDate) {
    this.startDate =
      startDate == null ? null : startDate.format(this.options.locale.format);
    this.endDate =
      endDate == null ? null : endDate.format(this.options.locale.format);
  }

  startDateChanged(newValue) {
    if (this.owningView.isAttached && newValue != null) {
      $(this.element).data("daterangepicker").setStartDate(newValue);
    }
  }

  endDateChanged(newValue) {
    if (this.owningView.isAttached && newValue != null) {
      $(this.element).data("daterangepicker").setEndDate(newValue);
    }
  }

  ConfigChanged(newValue) {
    const self = this;
    this.CreateConfig();

    this.startDate = null;
    this.endDate = null;
    $(this.element).daterangepicker(this.options);

    $(this.element).on("apply.daterangepicker", function (ev, picker) {
      self.apply(picker.startDate, picker.endDate);
    });

    $(this.element).on("cancel.daterangepicker", function (ev, picker) {
      self.apply(null, null);
    });
  }

  CreateConfig() {
    const self = this;
    this.options = null;
    this.options = $.extend(
      true,
      {
        locale: {
          format: self.format,
          cancelLabel: "Clear",
        },
      },
      this.options
    );

    if (self.minDate != null) {
      this.options = $.extend(this.options, {
        minDate: moment(self.minDate, self.options.locale.format),
      });
    }

    if (self.maxDate != null) {
      this.options = $.extend(this.options, {
        maxDate: moment(self.maxDate, self.options.locale.format),
      });
    }
    this.options = $.extend(this.options, {
      autoUpdateInput: false,
    });

    this.options = $.extend(this.options, {
      autoUpdateInput: false,
    });
  }
}
