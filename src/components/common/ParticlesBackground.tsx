'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type ParticlesConfig = Record<string, unknown>;

type ParticlesEngineInstance = {
    pJS?: {
        fn?: {
            vendors?: {
                destroypJS?: () => void;
            };
        };
    };
};

type ParticlesWindow = Window & {
    particlesJS?: (tagId: string, config: ParticlesConfig) => void;
    pJSDom?: ParticlesEngineInstance[];
};

const ParticlesBackground = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const initParticles = useCallback(() => {
        const particlesWindow = window as ParticlesWindow;
        if (!particlesWindow.particlesJS) return;
        const container = document.getElementById('particles-js');
        if (!container) return;

        const isDark = resolvedTheme === 'dark';

        if (particlesWindow.pJSDom?.length) {
            particlesWindow.pJSDom.forEach((instance) => {
                instance?.pJS?.fn?.vendors?.destroypJS?.();
            });
            particlesWindow.pJSDom = [];
        }

        // Separate configurations for completely different feel in dark/light modes
        const darkConfig: ParticlesConfig = {
            particles: {
                number: {
                    value: 60, // Higher density for dark mode
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3, // Much more visible opacity
                    random: true, // Add some randomness for starry night effect
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.25, // Visible connecting lines
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5, // Slightly slower for elegance
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        };

        const lightConfig: ParticlesConfig = {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: '#111827'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.16,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#111827',
                    opacity: 0.12,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        };

        // particles.js config
        particlesWindow.particlesJS('particles-js', isDark ? darkConfig : lightConfig);
    }, [resolvedTheme]);

    useEffect(() => {
        if (!mounted) return;

        const particlesWindow = window as ParticlesWindow;
        if (!particlesWindow.particlesJS) {
            const script = document.createElement('script');
            script.src = '/js/particles.min.js';
            script.async = true;
            script.onload = initParticles;
            document.body.appendChild(script);
            return;
        }

        initParticles();
    }, [mounted, initParticles]);

    if (!mounted) return null;

    return (
        <div
            id="particles-js"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none', // Allow clicking through to content, but hover events might need this to be 'auto' or handled carefully. 
                // Actually for particles.js interactivity to work, we need pointer-events: auto on the canvas. 
                // But since it's a background, we don't want it blocking clicks.
                // Compromise: We'll set the container to Z-index -1 so it's behind everything. 
                // Interactivity (hover) usually works if the elements above it don't have a background.
            }}
        />
    );
};

export default ParticlesBackground;
