document.addEventListener('DOMContentLoaded', () => {
  const swapsContainer = document.getElementById('swaps-container');
  const addBtn = document.getElementById('add-btn');
  const swapNameInput = document.getElementById('swap-name');
  const fromInput = document.getElementById('from-domain');
  const toInput = document.getElementById('to-domain');
  const toggle = document.getElementById('toggle');

  function loadSwaps() {
    chrome.storage.sync.get(['swaps', 'isEnabled'], (result) => {
      const swaps = result.swaps || [];
      const isEnabled = result.isEnabled !== false;
      toggle.checked = isEnabled;

      swapsContainer.innerHTML = '';
      swaps.forEach((swap, index) => {
        const div = document.createElement('div');
        div.className = 'swap-item';
        div.innerHTML = `
          <input type="checkbox" class="swap-toggle" data-index="${index}" ${swap.enabled ? 'checked' : ''}>
          <span>${swap.name}</span>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        swapsContainer.appendChild(div);
      });
      addEventListeners();
    });
  }

  function addEventListeners() {
    document.querySelectorAll('.swap-toggle').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        chrome.storage.sync.get(['swaps'], (result) => {
          const swaps = result.swaps || [];
          swaps[index].enabled = e.target.checked;
          chrome.storage.sync.set({swaps}, loadSwaps);
        });
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        chrome.storage.sync.get(['swaps'], (result) => {
          const swaps = result.swaps || [];
          swaps.splice(index, 1);
          chrome.storage.sync.set({swaps}, loadSwaps);
        });
      });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        chrome.storage.sync.get(['swaps'], (result) => {
          const swaps = result.swaps || [];
          const swap = swaps[index];
          swapNameInput.value = swap.name;
          fromInput.value = swap.from;
          toInput.value = swap.to;
          swaps.splice(index, 1);
          chrome.storage.sync.set({swaps}, loadSwaps);
        });
      });
    });
  }

  addBtn.addEventListener('click', () => {
    const name = swapNameInput.value.trim();
    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    if (name && from && to) {
      chrome.storage.sync.get(['swaps'], (result) => {
        const swaps = result.swaps || [];
        swaps.push({name, from, to, enabled: true});
        chrome.storage.sync.set({swaps}, () => {
          swapNameInput.value = '';
          fromInput.value = '';
          toInput.value = '';
          loadSwaps();
        });
      });
    }
  });

  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    chrome.storage.sync.set({isEnabled}, () => {
      console.log(`Domain Swapper ${isEnabled ? 'enabled' : 'disabled'}`);
    });
  });

  loadSwaps();
});
