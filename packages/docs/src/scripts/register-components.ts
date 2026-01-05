/**
 * Register all DuskMoon Elements web components
 * This script is loaded client-side to enable live component demos
 */

export async function registerAllComponents() {
  try {
    const [buttonModule, cardModule, inputModule, markdownModule] = await Promise.all([
      import('@duskmoon-dev/el-button/register'),
      import('@duskmoon-dev/el-card/register'),
      import('@duskmoon-dev/el-input/register'),
      import('@duskmoon-dev/el-markdown/register'),
    ]);

    buttonModule.register();
    cardModule.register();
    inputModule.register();
    markdownModule.register();

    console.log('DuskMoon Elements registered successfully');
  } catch (error) {
    console.error('Failed to register DuskMoon Elements:', error);
  }
}

export async function registerButton() {
  const { register } = await import('@duskmoon-dev/el-button/register');
  register();
}

export async function registerCard() {
  const { register } = await import('@duskmoon-dev/el-card/register');
  register();
}

export async function registerInput() {
  const { register } = await import('@duskmoon-dev/el-input/register');
  register();
}

export async function registerMarkdown() {
  const { register } = await import('@duskmoon-dev/el-markdown/register');
  register();
}
