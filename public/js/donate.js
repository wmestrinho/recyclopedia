(function () {
  'use strict';

  var ELECTRONICS = [
    {
      cat: 'Mobile & Tablets',
      items: ['Smartphone', 'Tablet / iPad', 'E-Reader (Kindle, Nook)', 'Smartwatch / Fitness Tracker', 'Feature Phone / Flip Phone', 'Pager']
    },
    {
      cat: 'Computers',
      items: ['Laptop / Notebook', 'Desktop Computer (Tower)', 'All-in-One Computer (iMac style)', 'Chromebook', 'MacBook', 'Server / Workstation', 'Mini PC / Raspberry Pi', 'Gaming PC']
    },
    {
      cat: 'Displays & TVs',
      items: ['LCD / LED Monitor', 'CRT Monitor (old boxy screen)', 'Flatscreen TV (LED/LCD)', 'OLED / QLED TV', 'CRT Television (tube TV)', 'Projector', 'Smart TV', 'Digital Photo Frame']
    },
    {
      cat: 'Audio',
      items: ['Bluetooth Speaker', 'Wired Bookshelf Speaker / Stereo Speaker', 'Subwoofer', 'Soundbar', 'Wired Headphones / Earbuds', 'Wireless Headphones / Earbuds', 'Amplifier / A/V Receiver', 'Turntable / Record Player', 'MP3 Player / iPod', 'Portable Radio / Boombox', 'Clock Radio', 'Stereo System']
    },
    {
      cat: 'Video & Entertainment',
      items: ['DVD Player', 'Blu-ray Player', 'VCR / VHS Player', 'Streaming Stick/Box (Roku, Firestick, Apple TV)', 'Camcorder', 'Action Camera (GoPro)', 'DVD / Blu-ray Disc Collection', 'Cable / Satellite Set-Top Box']
    },
    {
      cat: 'Gaming',
      items: ['Gaming Console (PlayStation)', 'Gaming Console (Xbox)', 'Gaming Console (Nintendo Switch/Wii/etc.)', 'Handheld Gaming Device (DS, PSP)', 'Game Boy / Game Boy Color / Advance', 'Gaming Controller', 'VR Headset', 'Gaming Headset', 'Gaming Keyboard', 'Gaming Mouse']
    },
    {
      cat: 'Cameras & Photography',
      items: ['Digital Camera (Point-and-Shoot)', 'DSLR Camera', 'Mirrorless Camera', 'Film Camera (35mm)', 'Polaroid / Instant Camera', 'Drone / Quadcopter', 'Security / Surveillance Camera', 'Dashcam', 'Webcam']
    },
    {
      cat: 'Home Office',
      items: ['Inkjet Printer', 'Laser Printer', 'All-in-One Printer / Scanner / Copier', 'Flatbed Scanner', 'Fax Machine', 'Paper Shredder', 'Calculator', 'Typewriter', 'Label Printer (Dymo, etc.)', 'Keyboard', 'Mouse', 'External Webcam', 'UPS / Battery Backup Unit', 'Surge Protector / Power Strip', 'Docking Station', 'USB Hub']
    },
    {
      cat: 'Networking',
      items: ['WiFi Router', 'Cable / DSL Modem', 'Network Switch / Hub', 'WiFi Extender / Range Repeater', 'Network Attached Storage (NAS)', 'Wireless Access Point', 'Ethernet Cable Bundle']
    },
    {
      cat: 'Storage Devices',
      items: ['External Hard Drive (HDD)', 'External SSD', 'USB Flash Drive / Thumb Drive', 'Memory Cards (SD, MicroSD — bundle)', 'Internal Hard Drive (bare)', 'Internal SSD (bare)', 'Optical Drive (CD/DVD)', 'Floppy Disk Drive']
    },
    {
      cat: 'Small Kitchen Appliances',
      items: ['Microwave Oven', 'Toaster', 'Toaster Oven / Countertop Oven', 'Blender', 'Coffee Maker', 'Espresso Machine', 'Rice Cooker', 'Slow Cooker / Crock-Pot', 'Instant Pot / Pressure Cooker', 'Air Fryer', 'Electric Kettle', 'Food Processor', 'Stand Mixer', 'Hand Mixer', 'Waffle Maker', 'Electric Griddle', 'Indoor Grill (George Foreman, etc.)', 'Juicer', 'Bread Maker', 'Popcorn Maker', 'Electric Can Opener']
    },
    {
      cat: 'Large Appliances',
      items: ['Refrigerator', 'Chest Freezer / Upright Freezer', 'Washing Machine', 'Dryer', 'Dishwasher', 'Electric Stove / Range', 'Wall Oven', 'Window Air Conditioner', 'Portable Air Conditioner', 'Dehumidifier', 'Humidifier', 'Space Heater', 'Electric Fan', 'Ceiling Fan', 'Trash Compactor']
    },
    {
      cat: 'Personal Care & Health',
      items: ['Hair Dryer', 'Curling Iron / Flat Iron / Hair Straightener', 'Electric Razor / Shaver', 'Electric Toothbrush', 'Foot or Back Massager', 'Blood Pressure Monitor', 'Blood Glucose Meter', 'Pulse Oximeter', 'CPAP Machine', 'Electric Heating Pad', 'Nail Lamp / UV Nail Dryer']
    },
    {
      cat: 'Power & Batteries',
      items: ['Power Bank / Portable Charger', 'Laptop Battery (removed)', 'Phone Battery (removed)', 'Rechargeable Batteries (AA, AAA — bundle)', 'Single-Use Batteries (AA, AAA — bundle)', 'Car Battery (Lead-Acid)', 'Battery Charger / Conditioner', 'Small Solar Panel (portable)']
    },
    {
      cat: 'Cables & Accessories',
      items: ['Charging Cables (mixed bundle)', 'Power Adapters / AC Bricks (bundle)', 'HDMI / DisplayPort Cables', 'USB Cables (bundle)', 'AV / RCA Cables', 'Extension Cords', 'Remote Controls (bundle)']
    },
    {
      cat: 'Smart Home & Wearables',
      items: ['Smart Speaker (Alexa, Google Home)', 'Smart Display (Echo Show, Nest Hub)', 'Smart Thermostat (Nest, Ecobee)', 'Smart Door Lock', 'Smart Doorbell / Video Doorbell', 'Smoke / CO Detector', 'GPS Device (car or hiking)', 'Walkie Talkies', 'Baby Monitor']
    },
    {
      cat: 'Lighting',
      items: ['CFL Bulbs (compact fluorescent — bundle)', 'Fluorescent Tube Lights', 'Smart Light Bulbs (Hue, Lifx, etc.)', 'LED Strip Lights', 'Smart Home Lighting Hub']
    },
    {
      cat: 'Power Tools',
      items: ['Cordless Drill', 'Circular Saw (corded or battery)', 'Jigsaw', 'Random Orbital Sander', 'Angle Grinder', 'Electric Screwdriver', 'Reciprocating Saw', 'Leaf Blower (electric)', 'Hedge Trimmer (electric)', 'String Trimmer / Weed Whacker (electric)', 'Electric Lawn Mower']
    },
    {
      cat: 'Miscellaneous Electronics',
      items: ['Alarm Clock / Digital Clock', 'Electronic Toys / Robotics Kit', 'Electric Bike Components', 'Electric Scooter Components', 'Ham Radio / CB Radio Equipment', 'Electronic Musical Instrument (keyboard, drum machine)', 'Hearing Aid', 'Medical Device (specify in notes)']
    }
  ];

  // Flatten all items for search
  var FLAT_ITEMS = [];
  ELECTRONICS.forEach(function (group) {
    group.items.forEach(function (name) {
      FLAT_ITEMS.push({ cat: group.cat, name: name });
    });
  });

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function initCombobox() {
    var combobox   = document.getElementById('item-combobox');
    var input      = document.getElementById('item-input');
    var dropdown   = document.getElementById('item-dropdown');
    var clearBtn   = document.getElementById('item-clear');
    var hiddenField = document.getElementById('item-value');
    if (!combobox || !input || !dropdown) return;

    var highlighted = -1;

    function getMatches(query) {
      var q = query.trim().toLowerCase();
      if (!q) return FLAT_ITEMS;
      return FLAT_ITEMS.filter(function (item) {
        return item.name.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q);
      });
    }

    function renderDropdown(matches) {
      if (!matches.length) {
        dropdown.innerHTML = '<div class="combobox__empty">No match found — type your item name and it will be accepted.</div>';
        return;
      }
      var grouped = {};
      matches.forEach(function (item) {
        if (!grouped[item.cat]) grouped[item.cat] = [];
        grouped[item.cat].push(item);
      });
      var html = '';
      Object.keys(grouped).forEach(function (cat) {
        html += '<div class="combobox__group-label">' + escHtml(cat) + '</div>';
        grouped[cat].forEach(function (item) {
          html += '<button class="combobox__item" type="button" data-value="' + escHtml(item.name) + '">' + escHtml(item.name) + '</button>';
        });
      });
      dropdown.innerHTML = html;
      dropdown.querySelectorAll('.combobox__item').forEach(function (btn) {
        btn.addEventListener('mousedown', function (e) {
          e.preventDefault();
          selectItem(btn.dataset.value);
        });
      });
    }

    function openDropdown() {
      highlighted = -1;
      renderDropdown(getMatches(input.value));
      dropdown.classList.add('is-open');
      input.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      dropdown.classList.remove('is-open');
      input.setAttribute('aria-expanded', 'false');
      highlighted = -1;
    }

    function selectItem(name) {
      input.value = name;
      if (hiddenField) hiddenField.value = name;
      if (clearBtn) clearBtn.classList.add('is-visible');
      closeDropdown();
    }

    input.addEventListener('focus', openDropdown);

    input.addEventListener('input', function () {
      if (hiddenField) hiddenField.value = '';
      if (clearBtn) clearBtn.classList.remove('is-visible');
      highlighted = -1;
      renderDropdown(getMatches(input.value));
      dropdown.classList.add('is-open');
      input.setAttribute('aria-expanded', 'true');
    });

    input.addEventListener('keydown', function (e) {
      var items = dropdown.querySelectorAll('.combobox__item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlighted = Math.min(highlighted + 1, items.length - 1);
        items.forEach(function (btn, i) { btn.classList.toggle('is-highlighted', i === highlighted); });
        if (items[highlighted]) items[highlighted].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlighted = Math.max(highlighted - 1, 0);
        items.forEach(function (btn, i) { btn.classList.toggle('is-highlighted', i === highlighted); });
        if (items[highlighted]) items[highlighted].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlighted >= 0 && items[highlighted]) {
          selectItem(items[highlighted].dataset.value);
        } else if (input.value.trim()) {
          selectItem(input.value.trim());
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
        input.blur();
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(closeDropdown, 150);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        if (hiddenField) hiddenField.value = '';
        clearBtn.classList.remove('is-visible');
        input.focus();
      });
    }
  }

  function initDonateForm() {
    initCombobox();

    var form = document.getElementById('donation-form');
    var successPanel = document.getElementById('donate-success');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var itemHidden = document.getElementById('item-value');
      var itemInput  = document.getElementById('item-input');
      if (itemHidden && !itemHidden.value && itemInput && itemInput.value.trim()) {
        itemHidden.value = itemInput.value.trim();
      }

      // The form has `novalidate`; surface the required-field checks ourselves.
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (itemHidden && !itemHidden.value) {
        if (itemInput) itemInput.focus();
        return;
      }

      // No backend yet — rather than silently drop the submission, hand it off
      // to the donor's email client fully pre-filled so it actually reaches us.
      var get = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var item = itemHidden ? itemHidden.value : '';
      var body = [
        'Item: ' + item,
        'Condition: ' + get('item-condition'),
        'Quantity: ' + get('item-quantity'),
        'Name: ' + get('donor-name'),
        'Email: ' + get('donor-email'),
        'Phone: ' + get('donor-phone'),
        'ZIP: ' + get('donor-zip'),
        '',
        'Notes:',
        get('item-notes')
      ].join('\n');
      var mailto = 'mailto:contact@absolutelyplausible.com'
        + '?subject=' + encodeURIComponent('Electronics donation — ' + (item || 'item'))
        + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;

      if (successPanel) {
        form.style.display = 'none';
        successPanel.classList.add('is-visible');
      }
    });

    var resetBtn = document.getElementById('donate-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        var itemHidden = document.getElementById('item-value');
        if (itemHidden) itemHidden.value = '';
        var clearBtn = document.getElementById('item-clear');
        if (clearBtn) clearBtn.classList.remove('is-visible');
        if (successPanel) successPanel.classList.remove('is-visible');
        form.style.display = '';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDonateForm);
  } else {
    initDonateForm();
  }
})();
