// State management
let components = [];
let workflows = [];
let ocrConfigs = [];

// Utility functions
const showSection = (sectionId) => {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
};

// Components handling
document.getElementById('componentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const component = {
        type: formData.get('type'),
        name: formData.get('name')
    };

    try {
        const response = await fetch('/api/components', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(component)
        });
        if (response.ok) {
            const newComponent = await response.json();
            components.push(newComponent);
            updateComponentsList();
            e.target.reset();
        }
    } catch (error) {
        console.error('Error creating component:', error);
    }
});

const updateComponentsList = () => {
    const list = document.getElementById('componentsList');
    list.innerHTML = components.map(component => `
        <div class="bg-white p-2 mb-2 rounded shadow">
            ${component.name} (${component.type})
        </div>
    `).join('');

    // Update components palette
    const palette = document.getElementById('componentsPalette');
    palette.innerHTML = `
        <h3 class="font-bold mb-2">Available Components</h3>
        ${components.map(component => `
            <div class="bg-gray-100 p-2 mb-2 rounded cursor-move" draggable="true" data-component='${JSON.stringify(component)}'>
                ${component.name}
            </div>
        `).join('')}
    `;

    // Update OCR form document components
    const documentSelect = document.querySelector('select[name="documentComponent"]');
    if (documentSelect) {
        documentSelect.innerHTML = components
            .filter(comp => comp.type === 'document')
            .map(comp => `<option value="${comp.name}">${comp.name}</option>`)
            .join('');
    }
};

// Load initial components
const loadComponents = async () => {
    try {
        const response = await fetch('/api/components');
        if (response.ok) {
            components = await response.json();
            updateComponentsList();
        }
    } catch (error) {
        console.error('Error loading components:', error);
    }
};

// Workflow handling
const initializeSortable = () => {
    const workflowItems = document.getElementById('workflow-items');
    new Sortable(workflowItems, {
        animation: 150,
        group: {
            name: 'workflow',
            pull: true,
            put: true
        },
        onSort: () => {
            saveWorkflow();
        }
    });

    const componentsPalette = document.getElementById('componentsPalette');
    new Sortable(componentsPalette, {
        animation: 150,
        group: {
            name: 'workflow',
            pull: 'clone',
            put: false
        }
    });
};

const saveWorkflow = async () => {
    const workflowItems = document.getElementById('workflow-items');
    const items = Array.from(workflowItems.children).map(item => {
        return JSON.parse(item.dataset.component);
    });

    try {
        await fetch('/api/workflows', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Main Workflow',
                components: items
            })
        });
    } catch (error) {
        console.error('Error saving workflow:', error);
    }
};

// OCR Configuration handling
document.getElementById('ocrForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const config = {
        documentComponent: formData.get('documentComponent'),
        criteria: formData.get('criteria')
    };

    try {
        const response = await fetch('/api/ocr-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });
        if (response.ok) {
            ocrConfigs.push(await response.json());
            e.target.reset();
        }
    } catch (error) {
        console.error('Error saving OCR configuration:', error);
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    initializeSortable();
});