document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const pb = document.getElementById('progress-bar');
        if(pb) pb.style.width = scrolled + '%';
    });

    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            let isLight = document.documentElement.getAttribute('data-theme') === 'light';
            document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
        });
    }

    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (termInput && termOutput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim();
                termInput.value = '';

                termOutput.innerHTML += `<div class="terminal-line"><span class="terminal-prompt">cyprien@cyberdefense-core:~$</span> ${cmd}</div>`;

                switch(cmd.toLowerCase()) {
                    case 'help':
                        termOutput.innerHTML += `<div class="terminal-line">Commandes valides :\n - <span class="highlight">about</span> : Infos rapides sur Cyprien\n - <span class="highlight">projects</span> : Liste et détails de mes dépôts Git techniques\n - <span class="highlight">clear</span> : Nettoie l'écran terminal</div>`;
                        break;
                    case 'about':
                        termOutput.innerHTML += `<div class="terminal-line">Étudiant BUT R&T en Alternance chez Orange. Cible : Orange Cyberdefense / École d'Ingénieurs.</div>`;
                        break;
                    case 'projects':
                    case 'repos':
                        termOutput.innerHTML += `<div class="terminal-line" style="color: #f1f5f9;">
⚡ <span class="highlight">Fetching Cyprien-git repositories...</span> [OK]

📂 <span style="color: #50fa7b;">containerlab_infra_core</span>
   ↳ Émulation de topologies réseaux complexes. Preuve de compétences en routage, commutation et lab d'infrastructures physiques/virtuelles.

📂 <span style="color: #50fa7b;">traefik_ovh_nginx</span> & <span style="color: #50fa7b;">docker_nginx_whoami_loadbalancer</span>
   ↳ Projets d'infrastructure web sécurisée : Gestion de reverse-proxy, Load Balancing, routage de trafic et automatisation de certificats SSL/TLS via OVH.

📂 <span style="color: #50fa7b;">Monitoring</span>
   ↳ Supervision d'infrastructures et collecte de métriques. Essentiel pour la détection d'anomalies et la visibilité en cybersécurité.

📂 <span style="color: #50fa7b;">image_multi_stage</span> & <span style="color: #50fa7b;">sphinx_doc_with_docker</span>
   ↳ Optimisation DevOps : Build d'images Docker légères et sécurisées (multi-stage) et automatisation de la documentation technique via conteneurs.</div>`;
                        break;
                    case 'clear':
                        termOutput.innerHTML = '';
                        break;
                    case '':
                        break;
                    default:
                        termOutput.innerHTML += `<div class="terminal-line" style="color: #ff5555;">bash: command not found: ${cmd}. Tapez 'help'.</div>`;
                }
                
                termOutput.scrollTop = termOutput.scrollHeight;
            }
        });

        document.querySelector('.terminal-container').addEventListener('click', () => {
            termInput.focus();
        });
    }

    // 4. FILTRE DES COMPÉTENCES (Page CV)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('#skills-container li');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            skillItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});