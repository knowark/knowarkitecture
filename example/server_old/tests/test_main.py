from tutorark.__main__ import main


async def test_main(monkeypatch):
    """
      Only assert if the function is defined.
      The function is not tested as it serves
      just as a bootstrapping mechanism for
      the application.
      """
    assert main is not None
