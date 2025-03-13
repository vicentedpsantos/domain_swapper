document.addEventListener('DOMContentLoaded', () => {
  const swapsContainer = document.getElementById('swaps-container');
  const addBtn = document.getElementById('add-btn');
  const fromInput = document.getElementById('from-domain');
  const toInput = document.getElementById('to-domain');

  function loadSwaps() {
    chrome.storage.sync.get(['swaps'], (result) => {
      const swaps = result.swaps || [];
      swapsContainer.innerHTML = '';
      swaps.forEach((swap, index) => {
        const div = document.createElement('div');
        div.className = 'swap-item';
        div.innerHTML = `
          <span>${swap.from} → ${swap.to}</span>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        swapsContainer.appendChild(div);
      });
      addEventListeners();
    });
  }

  function addEventListeners() {
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
          fromInput.value = swap.from;
          toInput.value = swap.to;
          swaps.splice(index, 1);
          chrome.storage.sync.set({swaps}, loadSwaps);
        });
      });
    });
  }

  addBtn.addEventListener('click', () => {
    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    if (from && to) {
      chrome.storage.sync.get(['swaps'], (result) => {
        const swaps = result.swaps || [];
        swaps.push({from, to});
        chrome.storage.sync.set({swaps}, () => {
          fromInput.value = '';
          toInput.value = '';
          loadSwaps();
        });
      });
    }
  });

  loadSwaps();
});
