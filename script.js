     // Color themes
        const colorThemes = {
            1: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            2: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            3: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
            4: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
            5: 'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
            6: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)'
        };
   
   // Get elements
        const animatedBg = document.getElementById('animatedBg');
        const colorBtns = document.querySelectorAll('.color-btn');
        const customColorInput = document.getElementById('customColor');
        const applyCustomBtn = document.getElementById('applyCustom');
        const particlesContainer = document.getElementById('particles');

        // Create particles
        function createParticles() {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Change color function
        function changeColor(color) {
            animatedBg.style.background = color;
            
            // Update keyframes for gradient shift
            const styleSheet = document.styleSheets[0];
            const keyframes = `@keyframes gradientShift {
                0% { background: ${color}; }
                50% { background: ${color}; }
                100% { background: ${color}; }
            }`;
            
            // Remove existing keyframes
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                if (styleSheet.cssRules[i].name === 'gradientShift') {
                    styleSheet.deleteRule(i);
                    break;
                }
            }
            
            // Add new keyframes
            styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        }

        // Event listeners for color buttons
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                colorBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const colorKey = btn.getAttribute('data-color');
                changeColor(colorThemes[colorKey]);
            });
        });

        // Custom color apply
        applyCustomBtn.addEventListener('click', () => {
            const customColor = customColorInput.value;
            const customGradient = `linear-gradient(45deg, ${customColor}, ${customColor}dd)`;
            changeColor(customGradient);
            
            // Remove active class from preset buttons
            colorBtns.forEach(b => b.classList.remove('active'));
        });

        // Initialize
        createParticles();

        // Add some interactive mouse effect
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                
                shape.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
            });
        });