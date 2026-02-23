---
pt-BR:
  layout: post
  date: 2026-02-22 10:00:00
  image: /assets/img/xbox-controller-linux/cover.jpg
  main-class: linux
  color: "#4285f4"
  tags:
    - linux
    - gaming
    - tutorial
    - arch
  categories:
    - linux
    - gaming
  title: "Como Configurar Controle Xbox One no Arch Linux (Omarchy)"
  description: "Guia completo para configurar e testar seu controle Xbox One no Arch Linux usando o driver xpad"
  body: |
    # Como Configurar Controle Xbox One no Arch Linux (Omarchy)

    Fala, pessoal! Então, você tá tentando jogar no Linux com seu controle Xbox One mas tá dando ruim? Relaxa, que eu passei por isso recentemente e vou te mostrar como resolver de forma bem simples.

    ## O Problema

    Olha, a parada é assim: você conecta o controle no USB, o Linux até reconhece que tem alguma coisa plugada ali, mas o driver específico pra controle Xbox (o tal do `xpad`) não carrega sozinho. Resultado? O hardware tá lá, detectado, mas seu jogo não consegue usar ele. Chato demais, né?

    ## Bora Ver se o Controle Tá Sendo Detectado

    Primeiro passo: vamos confirmar que o Linux pelo menos tá vendo teu controle. Roda isso no terminal:

    ```bash
    lsusb
    ```

    Procura por uma linha tipo essa:
    ```
    Bus 003 Device 004: ID 045e:02d1 Microsoft Corp. Xbox One Controller
    ```

    Achou? Show de bola! O hardware tá conectado direitinho.

    ## E Esse Driver xpad, Tá Aí?

    A boa notícia é que o Linux já vem com o driver `xpad` de fábrica, só que ele precisa ser carregado manualmente. Vamos checar se ele tá disponível no sistema:

    ```bash
    modinfo xpad
    ```

    Esse comando vai mostrar um monte de info sobre o driver - onde ele tá instalado, quais dispositivos ele suporta, essas coisas.

    ## Hora de Carregar o Driver

    Agora vem a mágica. Roda esse comando aqui:

    ```bash
    sudo modprobe xpad
    ```

    Pra confirmar que deu certo, cola isso:

    ```bash
    lsmod | grep xpad
    ```

    Se aparecer algo tipo:
    ```
    xpad                   49152  0
    ff_memless             20480  1 xpad
    ```

    Então é sucesso! O driver tá rodando.

    ## Verificando se o Joystick Apareceu

    Com o driver rodando, teu controle deve aparecer como um dispositivo joystick. Vamos checar:

    ```bash
    ls -la /dev/input/js*
    ```

    Deve aparecer algo tipo `/dev/input/js0`. Pra ter 100% de certeza que é o Xbox, roda:

    ```bash
    cat /sys/class/input/js0/device/name
    ```

    Se Vamos Testar Esse Bicho!

    Agora a parte divertida: vamos testar se todos os botões e analógicos tão funcionando. Primeiro, instala o `jstest` (se já não tiver):

    ```bash
    yay -S joyutils
    # ou se preferir
    sudo pacman -S joyutils
    ```

    Agora roda o teste:

    ```bash
    jstest /dev/input/js0
    ```

    Vai aparecer uma interface em tempo real mostrando:
    - **8 eixos**: Os dois analógicos, os gatilhos (RT/LT) e o D-pad
    - **11 botões**: A, B, X, Y, LB, RB, Select, Start, o botão do Xbox e os cliques dos analógicos

    Vai apertando os botões e mexendo nos analógicos pra ver os valores mudando na tela. É satisfatório ver tudo funcionando, confia

    Pressione os botões e mova os analógicos para ver os valores mudando. Isso confirma que tudo está funcionando!

    ## Fazendo Carregar Sozinho na Inicialização

    Olha, ficar rodando `modprobe` toda vez que ligar o PC é chato pra cacete, né? Vamos fazer isso automaticamente:

    ```bash
    echo "xpad" | sudo tee /etc/modules-load.d/xpad.conf
    ```

    Pronto! Isso cria um arquivo que fala pro sistema: "ó, carrega esse driver aí quando iniciar".

    ## O Que Você Conseguiu

    Quando tá tudo configurado, seu controle tem:
    - **Driver**: xpad (versão 2.1.0+)
    - **Eixos**: 8 (basicamente os analógicos, gatilhos e D-pad)
    - **Botões**: 11 (todos os botões do controle Xbox)
    - **Vibração**: Sim, funciona! (via módulo ff-memless)

    ## E Se Algo Der Errado?

    ### O controle não aparece em /dev/input/js0
    - Tira o cabo e conecta de novo depois de carregar o driver
    - Testa se o cabo USB não tá ruim (tenta em outro dispositivo)
    - Muda de porta USB, as vezes a porta que tá bugada

    ### O driver xpad não quer carregar
    - Confere se tá usando sudo (precisa de permissão de administrador)
    - O módulo deveria vir instalado por padrão no Arch, mas nunca se sabe né

    ### Alguns botões não respondem
    - Usa o `jstest` pra ver exatamente quais botões/eixos tão com problema
    - Pode ser problema no controle mesmo, testa em outro computador

    ## Onde Funciona?

    Depois de configurado, seu controle vai funcionar em:
    - **Steam**: Já detecta sozinho, é lindo
    - **Lutris**: Funciona de boa
    - **Wine/Proton**: Tranquilo demais
    - **Emuladores**: RetroArch, PCSX2, Dolphin, tudo de boa!

    ## Resumindo Tudo

    Olha, configurar o controle Xbox no Arch é bem mais tranquilo do que parece. É basicamente carregar o driver certo e pronto. O Linux tem um suporte muito bom pra controles Xbox, então depois que configurar uma vez, vai funcionar de boa em quase tudo.

    **Cola de comandos pra você salvar:**
    ```bash
    # Ver se o controle tá conectado
    lsusb | grep Xbox

    # Carregar o driver
    sudo modprobe xpad

    # Ver o dispositivo joystick
    ls -la /dev/input/js*

    # Testar o controle
    jstest /dev/input/js0

    # Fazer carregar sozinho no boot
    echo "xpad" | sudo tee /etc/modules-load.d/xpad.conf
    ```

    Agora é só partir pro abraço! 🎮
en:
  layout: post
  date: 2026-02-22 10:00:00
  image: /assets/img/xbox-controller-linux/cover.jpg
  main-class: linux
  color: "#4285f4"
  tags:
    - linux
    - gaming
    - tutorial
    - arch
  categories:
    - linux
    - gaming
  title: "How to Setup Xbox One Controller on Arch Linux (Omarchy)"
  description: "Complete guide to configure and test your Xbox One controller on Arch Linux using the xpad driver"
  body: |
    # How to Setup Xbox One Controller on Arch Linux (Omarchy)

    Hey there! So you're trying to game on Linux with your Xbox One controller but things aren't working out? Don't worry, I recently went through this myself and I'll show you how to fix it super easily.

    ## The Problem

    Here's the deal: you plug in your controller via USB, Linux even recognizes that something's plugged in, but the specific Xbox controller driver (the `xpad` one) doesn't load automatically. The result? The hardware is detected but your games can't actually use it. Pretty annoying, right?

    ## Let's Check if the Controller is Being Detected

    First things first: let's make sure Linux can at least see your controller. Run this in your terminal:

    ```bash
    lsusb
    ```

    Look for a line like this:
    ```
    Bus 003 Device 004: ID 045e:02d1 Microsoft Corp. Xbox One Controller
    ```

    Found it? Awesome! The hardware is connected properly.

    ## Is the xpad Driver There?

    Good news: Linux already comes with the `xpad` driver out of the box, but it needs to be manually loaded. Let's check if it's available on your system:

    ```bash
    modinfo xpad
    ```

    This command will show you a bunch of info about the driver - where it's installed, which devices it supports, that kind of stuff.

    ## Time to Load the Driver

    Here comes the magic. Run this command:

    ```bash
    sudo modprobe xpad
    ```

    To confirm it worked, check with:

    ```bash
    lsmod | grep xpad
    ```

    If you see something like:
    ```
    xpad                   49152  0
    ff_memless             20480  1 xpad
    ```

    Then success! The driver is running.

    ## Checking if the Joystick Showed Up

    With the driver running, your controller should show up as a joystick device. Let's check:

    ```bash
    ls -la /dev/input/js*
    ```

    You should see something like `/dev/input/js0`. To be 100% sure it's the Xbox, run:

    ```bash
    cat /sys/class/input/js0/device/name
    ```

    If Let's Test This Thing!

    Now for the fun part: let's test if all the buttons and analog sticks are working. First, install `jstest` (if you don't have it):

    ```bash
    yay -S joyutils
    # or if you prefer
    sudo pacman -S joyutils
    ```

    Now run the test:

    ```bash
    jstest /dev/input/js0
    ```

    You'll see a real-time interface showing:
    - **8 axes**: Both analog sticks, the triggers (RT/LT), and the D-pad
    - **11 buttons**: A, B, X, Y, LB, RB, Select, Start, the Xbox button, and the stick clicks

    Start pressing buttons and moving the sticks to see the values changing on screen. It's pretty satisfying to see everything working, trust me

    Press buttons and move the analog sticks to see the values changing. This confirms everything is working!

    ## Making It Load Automatically at Boot

    Look, running `modprobe` every time you start your PC is a pain in the ass, right? Let's make it automatic:

    ```bash
    echo "xpad" | sudo tee /etc/modules-load.d/xpad.conf
    ```

    Done! This creates a file that tells the system: "hey, load this driver when you boot up".

    ## What You Got Working

    When everything's configured, your controller has:
    - **Driver**: xpad (version 2.1.0+)
    - **Axes**: 8 (basically the analog sticks, triggers, and D-pad)
    - **Buttons**: 11 (all Xbox controller buttons)
    - **Rumble**: Yep, it works! (via ff-memless module)

    ## What If Something Goes Wrong?

    ### Controller doesn't show up in /dev/input/js0
    - Unplug and plug it back in after loading the driver
    - Check if the USB cable isn't busted (test it on another device)
    - Try a different USB port, sometimes the port itself is acting up

    ### xpad driver won't load
    - Make sure you're using sudo (you need admin permissions)
    - The module should come pre-installed on Arch, but you never know

    ### Some buttons don't respond
    - Use `jstest` to see exactly which buttons/axes are having issues
    - Might be a hardware problem with the controller itself, test it on another computer

    ## Where Does It Work?

    After it's set up, your controller will work on:
    - **Steam**: Auto-detects it, it's beautiful
    - **Lutris**: Works like a charm
    - **Wine/Proton**: No problems at all
    - **Emulators**: RetroArch, PCSX2, Dolphin, all good!

    ## Wrapping It Up

    Look, setting up an Xbox controller on Arch is way easier than it seems. It's basically just loading the right driver and you're done. Linux has really solid support for Xbox controllers, so once you set it up once, it'll work smoothly with almost everything.

    **Command cheat sheet to save:**
    ```bash
    # Check if controller is connected
    lsusb | grep Xbox

    # Load the driver
    sudo modprobe xpad

    # Check joystick device
    ls -la /dev/input/js*

    # Test controller
    jstest /dev/input/js0

    # Auto-load on boot
    echo "xpad" | sudo tee /etc/modules-load.d/xpad.conf
    ```

    Now you're ready to play! 🎮
---
